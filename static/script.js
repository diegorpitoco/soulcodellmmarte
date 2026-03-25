﻿// ==================================================
// GUIA RAPIDO (script.js)
// 1) Canvas: gradiente + estrelas (createStars/drawBackground/drawStars).
// 2) Animacao de entrada das secoes: initRevealObserver().
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

// Inicialização geral.
resizeCanvas();
render();
initRevealObserver();
window.addEventListener("resize", resizeCanvas);
