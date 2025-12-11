const cards = Array.from(document.querySelectorAll(".card"));
const prevBtn = document.getElementById("prevCard");
const nextBtn = document.getElementById("nextCard");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));

let currentIndex = 0;

// Flip-Effekt pro Karte
function attachFlipHandler(card) {
  card.addEventListener("click", (ev) => {
    // Klicks auf Navigations-Elemente nicht als Flip werten
    if (ev.target.closest(".nav-btn") || ev.target.closest(".nav-link")) return;
    card.classList.toggle("is-flipped");
  });
}

cards.forEach(attachFlipHandler);

function showCard(index) {
  if (index < 0) index = cards.length - 1;
  if (index >= cards.length) index = 0;
  currentIndex = index;

  cards.forEach((card, i) => {
    const isActive = i === currentIndex;
    card.classList.toggle("active", isActive);
    if (isActive) {
      // immer mit Frage-Seite starten
      card.classList.remove("is-flipped");
    }
  });

  navLinks.forEach((btn, i) => {
    btn.classList.toggle("active", i === currentIndex);
  });

  if (window.MathJax && window.MathJax.typesetPromise) {
    MathJax.typesetPromise();
  }
}

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showCard(currentIndex - 1);
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showCard(currentIndex + 1);
});

navLinks.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const idx = Number(btn.dataset.index);
    showCard(idx);
  });
});

// Pfeiltasten zum Wechseln
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    showCard(currentIndex + 1);
  } else if (e.key === "ArrowLeft") {
    showCard(currentIndex - 1);
  }
});

// Initial
document.addEventListener("DOMContentLoaded", () => {
  showCard(0);
});
