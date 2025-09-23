
/* --- Script: botón reproduce/pausa audio --- */
const floweBtn = document.querySelector(".flower-btn");
const audio = document.getElementById("id_audio");
let isPlaying = false;

floweBtn.onclick = () => {
  if (!audio) return;
  
  if (!isPlaying) {
    // Si no está reproduciendo, reproducir
    audio.volume = 0.5;
    audio.play().catch(()=>{/* autoplay blocked */});
    isPlaying = true;

   // 🎨 Cambiar a degradado rojo-naranja estilo Instagram
floweBtn.style.background = "linear-gradient(45deg, #ff0000, #ff7a00)";

  } else {
    // Si está reproduciendo, pausar
    audio.pause();
    isPlaying = false;

    // 🎨 Volver al degradado original
    floweBtn.style.background = "linear-gradient(45deg, #ffbb00, #ff5e00)";
  }
};

/* --- Script: replica el comportamiento de creación de shooting stars desde index2 --- */
onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    function createShootingStar() {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      star.style.top = Math.random() * 60 + '%';
      star.style.animationDelay = '0s';
      star.style.animationDuration = (Math.random() * 1.5 + 2) + 's';

      document.querySelector('.shooting-stars').appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 4000);
    }

    // Crear luces flotantes automáticamente en ambos lados
(function createFloatingLightsBothSides(opts = {}) {
  const leftCount  = Number.isFinite(opts.left)  ? opts.left  : 60; // por defecto 30 a la izquierda
  const rightCount = Number.isFinite(opts.right) ? opts.right : 60; // por defecto 30 a la derecha
  const docH = window.innerHeight;
  const docW = window.innerWidth;

  function addLightAt(x, y, size, delay, blur, opacity) {
    const l = document.createElement('div');
    l.className = 'light';
    l.style.left = x + 'px';
    l.style.bottom = y + 'px';
    l.style.width = size + 'px';
    l.style.height = size + 'px';
    l.style.opacity = String(opacity);
    l.style.filter = 'blur(' + blur + 'px)';
    l.style.animationDelay = delay + 's';
    l.style.zIndex = 1;
    // opcional: variar color sutilmente para que no sean idénticas (usa background-color si tu .light lo permite)
    // l.style.backgroundColor = `rgba(0, 229, 255, ${0.4 + Math.random()*0.6})`;
    document.body.appendChild(l);
    return l;
  }

  // genera N luces en una franja horizontal entre xMin..xMax (px)
  function generateInStrip(count, xMin, xMax) {
    for (let i = 0; i < count; i++) {
      const x = Math.round(Math.random() * (xMax - xMin) + xMin);
      // repartir verticalmente entre 0 y 75% de la altura del viewport
      const y = Math.round(Math.random() * (docH * 0.75));
      // tamaño aleatorio pequeño/mediano/grande (ajusta si quieres)
      const size = [6, 10, 14][Math.floor(Math.random() * 3)];
      const delay = Math.random() * 6; // delay 0..6s
      const blur = 1 + Math.random() * 3; // blur 1..4px
      const opacity = 0.45 + Math.random() * 0.55; // 0.45..1.0
      addLightAt(x, y, size, delay, blur, opacity);
    }
  }

  // LEFT: franja izquierda (5% .. 45% del ancho)
  const leftMin = Math.round(docW * 0.02);
  const leftMax = Math.round(docW * 0.45);

  // RIGHT: franja derecha (55% .. 98% del ancho)
  const rightMin = Math.round(docW * 0.55);
  const rightMax = Math.round(docW * 0.98);

  generateInStrip(leftCount, leftMin, leftMax);
  generateInStrip(rightCount, rightMin, rightMax);

  // Opcional: re-ajustar al redimensionar (limpia y vuelve a generar)
  let resizeTid = null;
  function regenOnResize() {
    clearTimeout(resizeTid);
    resizeTid = setTimeout(() => {
      // eliminar lights creadas por esta función (dejamos las originales .light-* que ya tienes)
      const created = Array.from(document.querySelectorAll('body > .light')).filter(el => {
        // heurística: si tiene style.width en px (generadas por JS) las borramos
        return el.style && el.style.width && el.style.width.endsWith('px');
      });
      created.forEach(el => el.remove());
      // volver a generar con mismos parámetros
      const newDocH = window.innerHeight;
      const newDocW = window.innerWidth;
      // recalcular y regenerar
      // NOTA: usamos same counts que antes
      for (let i = 0; i < leftCount; i++) {
        const x = Math.round(Math.random() * (Math.round(newDocW * 0.45) - Math.round(newDocW * 0.02)) + Math.round(newDocW * 0.02));
        const y = Math.round(Math.random() * (newDocH * 0.75));
        const size = [6,10,14][Math.floor(Math.random()*3)];
        addLightAt(x, y, size, Math.random()*6, 1 + Math.random()*3, 0.45 + Math.random()*0.55);
      }
      for (let i = 0; i < rightCount; i++) {
        const x = Math.round(Math.random() * (Math.round(newDocW * 0.98) - Math.round(newDocW * 0.55)) + Math.round(newDocW * 0.55));
        const y = Math.round(Math.random() * (newDocH * 0.75));
        const size = [6,10,14][Math.floor(Math.random()*3)];
        addLightAt(x, y, size, Math.random()*6, 1 + Math.random()*3, 0.45 + Math.random()*0.55);
      }
    }, 200);
  }
  window.addEventListener('resize', regenOnResize);
})({ left: 35, right: 35 }); // <- aquí defines cuántas luces quieres a la izquierda y derecha


    setInterval(() => {
      if (Math.random() > 0.3) {
        createShootingStar();
      }
    }, Math.random() * 5000 + 3000);

    clearTimeout(c);
  }, 1000);
};

function togglePergamino() {
  const pergamino = document.getElementById('pergamino');
  pergamino.classList.toggle('desplegado');
}

// Animación de entrada del pergamino
setTimeout(() => {
  const pergaminoContainer = document.querySelector('.pergamino-container');
  pergaminoContainer.style.opacity = '0';
  pergaminoContainer.style.transform = 'translateY(-50%) scale(0.8)';
  
  setTimeout(() => {
    pergaminoContainer.style.transition = 'all 0.8s ease-out';
    pergaminoContainer.style.opacity = '1';
    pergaminoContainer.style.transform = 'translateY(-50%) scale(1)';
  }, 100);
}, 2000);

    