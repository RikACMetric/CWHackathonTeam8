import json
import subprocess
from flask import Flask, request, jsonify, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/chat", methods=["POST"])
def chat():
    body = request.get_json()
    prompt = body.get("message", "")
    if not prompt:
        return jsonify({"error": "No message provided"}), 400

    def stream():
        proc = subprocess.Popen(
            [
                "claude",
                "-p",
                prompt,
                "--output-format",
                "stream-json",
                "--verbose",
                "--allowedTools",
                "Edit,Write,Read,Bash,Glob,Grep",
            ],
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

                if etype == "assistant":
                    # Extract text content from the assistant message
                    content = event.get("message", {}).get("content", [])
                    for block in content:
                        if block.get("type") == "text":
                            yield f"data: {json.dumps({'type': 'text', 'content': block['text']})}\n\n"
                        elif block.get("type") == "tool_use":
                            yield f"data: {json.dumps({'type': 'tool', 'tool': block.get('name', ''), 'input': block.get('input', {})})}\n\n"

                elif etype == "result":
                    yield f"data: {json.dumps({'type': 'done', 'content': event.get('result', '')})}\n\n"

            except json.JSONDecodeError:
                continue

        proc.wait()

    return Response(stream(), mimetype="text/event-stream")


if __name__ == "__main__":
    app.run(port=5000, debug=True)
