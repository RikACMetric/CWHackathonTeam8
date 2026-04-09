import json
import subprocess

import streamlit as st

st.title("Claude Code Chat")

if "messages" not in st.session_state:
    st.session_state.messages = []

for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

if prompt := st.chat_input("Ask Claude something..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            cmd = [
                "claude", "-p", prompt, "--output-format", "json",
                "--allowedTools", "Edit,Write,Read,Bash,Glob,Grep",
            ]
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=120,
            )
            response = json.loads(result.stdout)
            reply = response["result"]
            st.markdown(reply)

    st.session_state.messages.append({"role": "assistant", "content": reply})
