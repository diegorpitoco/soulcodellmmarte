// ==================================================
// GUIA RAPIDO (script.js)
// 1) Canvas: gradiente + estrelas (createStars/drawBackground/drawStars).
// 2) Animacao de entrada das secoes: initRevealObserver().
// 3) Movimento do widget no scroll: initFloatingAgentMotion().
// 4) Chat do widget: initFloatingAgentChat() (integra com o backend Flask).
// ==================================================
// Sessão persistente para o chat do agente
const sessionId =
  localStorage.getItem("chat_session") ||
  (window.crypto && crypto.randomUUID ? crypto.randomUUID() : `session-${Date.now()}-${Math.random()}`);

localStorage.setItem("chat_session", sessionId);

// ==================================================
// FUNDO EM CANVAS: GRADIENTE + ESTRELAS
// Observacao: o planeta Marte esta em CSS (camada .mars-background).
// ==================================================
const canvas = document.getElementById("space-canvas");
const ctx = canvas.getContext("2d");

const config = {
  starsCount: 200,
};

const state = {
  width: window.innerWidth,
  height: window.innerHeight,
  time: 0,
  stars: [],
};

// Cria estrelas com posição, tamanho e "fase" de brilho.
function createStars() {
  state.stars = [];
  for (let i = 0; i < config.starsCount; i += 1) {
    state.stars.push({
      x: Math.random() * state.width,
      y: Math.random() * state.height,
      radius: Math.random() * 1.8 + 0.4,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.025 + 0.01,
    });
  }
}

// Ajusta canvas para tela atual.
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.width = window.innerWidth;
  state.height = window.innerHeight;

  canvas.width = Math.floor(state.width * dpr);
  canvas.height = Math.floor(state.height * dpr);
  canvas.style.width = `${state.width}px`;
  canvas.style.height = `${state.height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  createStars();
}

// Desenha o gradiente espacial de fundo.
function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, state.height);
  gradient.addColorStop(0, "#4a1a6b");
  gradient.addColorStop(1, "#0a0a1a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, state.width, state.height);
}

// Desenha estrelas com efeito de piscar.
function drawStars() {
  for (const star of state.stars) {
    const twinkle = 0.45 + 0.55 * Math.sin(state.time * star.speed + star.phase);
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${twinkle})`;
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Loop principal de renderização.
function render() {
  state.time += 1;
  drawBackground();
  drawStars();
  requestAnimationFrame(render);
}

// ==================================================
// ANIMAÇÃO DE ENTRADA DAS SEÇÕES (FADE-IN)
// ==================================================
function initRevealObserver() {
  const sections = document.querySelectorAll(".reveal");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// ==================================================
// MOVIMENTO SUAVE DO WIDGET FLUTUANTE NO SCROLL
// ==================================================
function initFloatingAgentMotion() {
  const widget = document.querySelector(".agent-float");
  if (!widget) return;

  let lastY = window.scrollY;
  let targetShift = 0;
  let currentShift = 0;

  window.addEventListener(
    "scroll",
    () => {
      const nowY = window.scrollY;
      const delta = nowY - lastY;
      lastY = nowY;

      // Direção do scroll define o impulso do movimento.
      targetShift += Math.max(-10, Math.min(10, delta * 0.2));
      targetShift = Math.max(-16, Math.min(16, targetShift));
    },
    { passive: true }
  );

  function animateWidget() {
    // Inércia: aproxima suavemente da meta e volta ao centro.
    currentShift += (targetShift - currentShift) * 0.08;
    targetShift *= 0.92;
    widget.style.transform = `translateY(${currentShift.toFixed(2)}px)`;
    requestAnimationFrame(animateWidget);
  }

  animateWidget();
}

// ==================================================
// CHAT DO WIDGET FLUTUANTE (HISTÓRICO COM ROLAGEM)
// ==================================================
function initFloatingAgentChat() {
  const form = document.getElementById("agent-float-form");
  const input = document.getElementById("agent-float-input");
  const messages = document.getElementById("agent-float-messages");
  const widget = document.querySelector(".agent-float");
  const statusEl = document.getElementById("agent-status");
  const toggleBtn = document.getElementById("agent-toggle");
  if (!form || !input || !messages) return;

  const fallbackMessage =
    "Não encontrei exatamente essa informação. Talvez você queira perguntar sobre ofertas públicas ou ESG da NEOOH.";
  const fallbackSuggestion =
    "Você pode conferir a seção Referências abaixo ou ajustar o termo para obter mais resultados.";

  function setAgentStatus(text) {
    if (statusEl) {
      statusEl.textContent = text;
    }
  }

  function pulseWidget() {
    if (!widget) return;
    widget.classList.remove("agent-highlight");
    void widget.offsetWidth;
    widget.classList.add("agent-highlight");
    const handleAnimationEnd = () => {
      widget.classList.remove("agent-highlight");
      widget.removeEventListener("animationend", handleAnimationEnd);
    };
    widget.addEventListener("animationend", handleAnimationEnd);
  }

  function appendMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `agent-msg agent-msg--${sender}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
    if (sender === "agent") {
      setAgentStatus("Status: pronto para mais perguntas.");
      pulseWidget();
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    setAgentStatus("Status: pesquisando fontes...");
    appendMessage(question, "user");

    const typing = document.createElement("div");
    typing.className = "agent-msg agent-msg--agent typing";
    typing.textContent = "Digitando...";
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    try {
      const response = await fetch("/perguntar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pergunta: question,
          session_id: sessionId,
        }),
      });

      const data = await response.json();
      typing.remove();
      const responseText = data.resposta || fallbackMessage;
      appendMessage(responseText, "agent");
      if (!data.resposta) {
        appendMessage(fallbackSuggestion, "agent");
      }
    } catch (error) {
      typing.remove();
      appendMessage("Erro ao conectar com o agente.", "agent");
      setAgentStatus("Status: indisponível no momento.");
    }

    input.value = "";
    input.focus();
  });

  if (toggleBtn && widget) {
    let collapsed = false;
    toggleBtn.addEventListener("click", () => {
      collapsed = !collapsed;
      widget.classList.toggle("agent-float--collapsed", collapsed);
      toggleBtn.textContent = collapsed ? "+" : "−";
      toggleBtn.setAttribute("aria-expanded", String(!collapsed));
      toggleBtn.setAttribute("aria-label", collapsed ? "Maximizar agente" : "Minimizar agente");
    });
  }

  setAgentStatus("Status: pronto para conversar.");
}

// Inicialização geral.
resizeCanvas();
render();
initRevealObserver();
initFloatingAgentMotion();
initFloatingAgentChat();
window.addEventListener("resize", resizeCanvas);
