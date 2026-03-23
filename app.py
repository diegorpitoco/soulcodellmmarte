from flask import Flask, render_template, request, jsonify
import os
import uuid

from google.cloud import dialogflowcx_v3 as dialogflowcx

app = Flask(__name__)

# ======================================
# CONFIGURAÇÃO DO AGENTE
# ======================================
PROJECT_ID = "bootcam-llm-ai3"
LOCATION = "global"
AGENT_ID = "95c4f54d-9f31-4c24-9be9-1be9dd6085d6"

client = dialogflowcx.SessionsClient()


@app.route("/")
def index():
    return render_template("index.html")


def chamar_agente(pergunta, session_id):
    session_path = client.session_path(
        PROJECT_ID,
        LOCATION,
        AGENT_ID,
        session_id,
    )

    text_input = dialogflowcx.TextInput(text=pergunta)
    query_input = dialogflowcx.QueryInput(
        text=text_input,
        language_code="pt-br",
    )

    request_api = dialogflowcx.DetectIntentRequest(
        session=session_path,
        query_input=query_input,
    )

    response = client.detect_intent(request=request_api)

    respostas = []
    for message in response.query_result.response_messages:
        if message.text:
            respostas.extend(message.text.text)

    if respostas:
        return " ".join(respostas)

    return """Não encontrei exatamente essa informação.

Talvez você esteja procurando algo como:

• O que é uma oferta pública?
• Como funcionam debêntures?
• O que é a Neooh?
"""


@app.route("/perguntar", methods=["POST"])
def perguntar():
    data = request.get_json()
    pergunta = data.get("pergunta")
    session_id = data.get("session_id")
    resposta = chamar_agente(pergunta, session_id)
    return jsonify({"resposta": resposta})


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8080)),
        debug=True,
    )
