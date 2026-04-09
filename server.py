import json
import subprocess
from flask import Flask, request, jsonify, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Store session ID so follow-up messages have conversation context
session = {"id": None}


@app.route("/api/chat", methods=["POST"])
def chat():
    body = request.get_json()
    prompt = body.get("message", "")
    if not prompt:
        return jsonify({"error": "No message provided"}), 400

    def stream():
        cmd = [
            "claude",
            "-p", prompt,
            "--output-format", "stream-json",
            "--verbose",
            "--allowedTools", "Edit,Write,Read,Bash,Glob,Grep",
        ]
        # Resume existing session for conversation continuity
        if session["id"]:
            cmd += ["--resume", session["id"]]

        proc = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        for line in proc.stdout:
            line = line.strip()
            if not line:
                continue
            try:
                event = json.loads(line)
                etype = event.get("type")

                # Capture session ID from init or result
                if etype == "system" and event.get("session_id"):
                    session["id"] = event["session_id"]

                if etype == "assistant":
                    content = event.get("message", {}).get("content", [])
                    for block in content:
                        if block.get("type") == "text":
                            yield f"data: {json.dumps({'type': 'text', 'content': block['text']})}\n\n"
                        elif block.get("type") == "tool_use":
                            yield f"data: {json.dumps({'type': 'tool', 'tool': block.get('name', ''), 'input': block.get('input', {})})}\n\n"

                elif etype == "result":
                    if event.get("session_id"):
                        session["id"] = event["session_id"]
                    yield f"data: {json.dumps({'type': 'done', 'content': event.get('result', '')})}\n\n"

            except json.JSONDecodeError:
                continue

        proc.wait()

    return Response(stream(), mimetype="text/event-stream")


if __name__ == "__main__":
    app.run(port=5000, debug=True)
