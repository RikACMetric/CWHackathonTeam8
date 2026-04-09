import json
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/chat", methods=["POST"])
def chat():
    body = request.get_json()
    prompt = body.get("message", "")
    if not prompt:
        return jsonify({"error": "No message provided"}), 400

    try:
        result = subprocess.run(
            [
                "claude",
                "-p",
                prompt,
                "--output-format",
                "json",
                "--allowedTools",
                "Edit,Write,Read,Bash,Glob,Grep",
            ],
            capture_output=True,
            text=True,
            timeout=120,
        )
        response = json.loads(result.stdout)
        return jsonify({"reply": response["result"]})
    except subprocess.TimeoutExpired:
        return jsonify({"error": "Request timed out"}), 504
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
