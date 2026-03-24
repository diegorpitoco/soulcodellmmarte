# Arquitetura do projeto

O front-end permanece como uma única landing page, mas agora o Flask serve `templates/index.html` com os ativos (`style.css`, `script.js`, `agents-data.js`) dentro da pasta `static/`. Isso deixa o projeto alinhado às convenções do Flask e facilita o deploy no Cloud Run, App Engine ou outro serviço compatível.

## Estrutura principal

- `templates/index.html` → HTML renderizado pelo `render_template("index.html")`.
- `static/style.css`, `static/script.js`, `static/agents-data.js` → assets referenciados dentro do template via `url_for('static', ...)`.
- `app.py` → controla as rotas `/` e `/perguntar`, chama o Dialogflow CX e responde ao widget.
- `Procfile` + `requirements.txt` → suportam o deploy (Gunicorn + dependências).

## Como rodar localmente

1. Ative o virtualenv e instale dependências (já feito no seu ambiente):
   ```bash
   source ~/.venv/bin/activate
   pip install -r requirements.txt
   ```
2. Exporte as credenciais do Dialogflow CX (ajuste o caminho para o JSON da sua conta de serviço):
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="$HOME/credenciais/dialogflow-cx.json"
   ```
3. Execute o app em modo de desenvolvimento:
   ```bash
   python app.py
   ```
   ou `gunicorn app:app` para replicar o ambiente de produção.
4. Abra `http://127.0.0.1:8080` (ou use o preview do Cloud Shell) e envie perguntas pelo widget.

## Deploy

- O `Procfile` já aponta para o Gunicorn (`web: gunicorn --bind :$PORT app:app`).
- Em qualquer serviço, basta ter as variáveis `GOOGLE_APPLICATION_CREDENTIALS`, `PROJECT_ID`, etc., configuradas no ambiente; o `app.py` já lê diretamente dos valores codificados, mas você pode externalizar para `config.py` ou `env vars` se quiser.
- Faça o push para o GitHub, abra a branch e crie o PR antes de disparar o deploy final.

Se quiser, posso continuar e adicionar testes para o `chamar_agente` ou separar rotas em `blueprints`. Deseja isso também?
