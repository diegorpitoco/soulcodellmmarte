// ==================================================
// GUIA RAPIDO (script.js)
// 1) Canvas: gradiente + estrelas (createStars/drawBackground/drawStars).
// 2) Animacao de entrada das secoes: initRevealObserver().
// 3) Movimento do widget no scroll: initFloatingAgentMotion().
// 4) Chat do widget: initFloatingAgentChat() (usa agents-data.js quando existe).
// ==================================================
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
  if (!form || !input || !messages) return;

  // Se existir base local (agents-data.js), usamos respostas documentadas.
  const store =
    window.BOOTCAMP_AGENTS && window.BOOTCAMP_AGENTS.ofertas_publicas
      ? window.BOOTCAMP_AGENTS.ofertas_publicas
      : null;

  // Mensagem de seguranca quando nao houver cobertura para a pergunta.
  const fallback = store
    ? store.fallback
    : "Este agente responde apenas com base no Data Store público da NEOOH e não possui informações suficientes para responder essa pergunta com segurança.";

  function normalize(text) {
    return (text || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function appendMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `agent-msg agent-msg--${sender}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function findAnswer(question) {
    if (!store || !store.qa) return fallback;
    const qNorm = normalize(question);
    if (!qNorm) return fallback;

    for (const item of store.qa) {
      const candidates = [item.pergunta].concat(item.aliases || []).map(normalize);
      const matched = candidates.some(
        (c) => qNorm === c || qNorm.includes(c) || c.includes(qNorm)
      );
      if (matched) return item.resposta;
    }

    return fallback;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    appendMessage(question, "user");
    const answer = findAnswer(question);

    window.setTimeout(() => {
      appendMessage(answer, "agent");
    }, 180);

    input.value = "";
    input.focus();
  });
}

// Inicialização geral.
resizeCanvas();
render();
initRevealObserver();
initFloatingAgentMotion();
initFloatingAgentChat();
window.addEventListener("resize", resizeCanvas);

