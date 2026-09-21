/* --- Botón: reproduce / pausa el audio --- */
const flowerBtn = document.querySelector(".flower-btn");
const audio = document.getElementById("id_audio");
let isPlaying = false;

const BTN_IDLE = "linear-gradient(45deg, #ffbb00, #ff5e00)";
const BTN_PLAYING = "linear-gradient(45deg, #ff0000, #ff7a00)"; // degradado rojo-naranja estilo Instagram

flowerBtn.onclick = () => {
  if (!audio) return;

  if (!isPlaying) {
    audio.volume = 0.5;
    const playing = audio.play();
    // Solo cambiamos el estado si el navegador realmente logró reproducir (antes se marcaba aunque fallara)
    if (playing && typeof playing.then === "function") {
      playing.then(() => {
        isPlaying = true;
        flowerBtn.style.background = BTN_PLAYING;
      }).catch(() => { /* autoplay bloqueado o archivo no encontrado */ });
    } else {
      isPlaying = true;
      flowerBtn.style.background = BTN_PLAYING;
    }
  } else {
    audio.pause();
    isPlaying = false;
    flowerBtn.style.background = BTN_IDLE; // vuelve al degradado original
  }
};

/* --- Luces flotantes (izquierda + derecha) ---
   Misma distribución y mismo aspecto que antes. Mejoras:
   - Se insertan todas juntas (un solo DocumentFragment) en vez de una por una.
   - En pantallas pequeñas o equipos modestos se crean menos luces (ajustable abajo).
   - Al redimensionar solo se regeneran si cambió el ANCHO (en el celular la barra del navegador
     cambia la altura al hacer scroll y antes eso regeneraba todo). */
const LIGHTS_PER_SIDE = 35;      // cantidad por lado en pantallas grandes (igual que antes)
const ADAPTIVE_QUALITY = true;   // pon false para tener siempre LIGHTS_PER_SIDE en cualquier equipo

function lightsPerSide() {
  let n = LIGHTS_PER_SIDE;
  if (!ADAPTIVE_QUALITY) return n;
  if (window.innerWidth < 700) n = Math.round(n * 0.45);            // celular: pantalla mucho más pequeña
  const weakDevice = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  if (weakDevice) n = Math.round(n * 0.7);
  return Math.max(8, n);
}

function createFloatingLights() {
  document.querySelectorAll(".light--js").forEach((el) => el.remove());

  const perSide = lightsPerSide();
  const docW = window.innerWidth;
  const docH = window.innerHeight;
  const fragment = document.createDocumentFragment();

  function addLight(xMin, xMax) {
    const l = document.createElement("div");
    const size = [6, 10, 14][Math.floor(Math.random() * 3)];
    l.className = "light light--js";
    l.style.left = Math.round(Math.random() * (xMax - xMin) + xMin) + "px";
    l.style.bottom = Math.round(Math.random() * (docH * 0.75)) + "px"; // reparto vertical: 0..75 % del alto
    l.style.width = size + "px";
    l.style.height = size + "px";
    l.style.opacity = String(0.45 + Math.random() * 0.55);              // 0.45..1.0
    l.style.filter = "blur(" + (1 + Math.random() * 3) + "px)";         // 1..4px
    l.style.animationDelay = Math.random() * 6 + "s";                   // 0..6s
    l.style.zIndex = 1;
    fragment.appendChild(l);
  }

  for (let i = 0; i < perSide; i++) addLight(Math.round(docW * 0.02), Math.round(docW * 0.45)); // franja izquierda
  for (let i = 0; i < perSide; i++) addLight(Math.round(docW * 0.55), Math.round(docW * 0.98)); // franja derecha
  document.body.appendChild(fragment);
}

let lastWidth = window.innerWidth;
let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (Math.abs(window.innerWidth - lastWidth) < 80) return;
    lastWidth = window.innerWidth;
    createFloatingLights();
  }, 250);
});

/* --- Estrellas fugaces extra (las 8 fijas están en el HTML/CSS) --- */
function createShootingStar() {
  const container = document.querySelector(".shooting-stars");
  if (!container || document.hidden) return; // sin pestaña visible no tiene sentido crearlas

  const star = document.createElement("div");
  star.className = "shooting-star";
  star.style.top = Math.random() * 60 + "%";
  star.style.animationDelay = "0s";
  star.style.animationDuration = Math.random() * 1.5 + 2 + "s";
  container.appendChild(star);

  setTimeout(() => star.remove(), 4000);
}

/* --- Arranque: 1 s después de cargar la página comienzan las animaciones --- */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.remove("not-loaded");
    createFloatingLights();

    setInterval(() => {
      if (Math.random() > 0.3) createShootingStar();
    }, Math.random() * 5000 + 3000);
  }, 1000);
});

/* --- Pergamino: se despliega / se pliega al hacer clic ---
   (La animación de entrada del pergamino la hace solo el CSS: el bloque de JavaScript que había aquí
   no tenía efecto porque una animación CSS con "forwards" siempre gana sobre los estilos en línea,
   y según el momento de carga podía provocar un parpadeo.) */
function togglePergamino() {
  document.getElementById("pergamino").classList.toggle("desplegado");
}
