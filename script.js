const cards = Array.from(document.querySelectorAll(".card"));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const prevBtn = document.getElementById("prevCard");
const nextBtn = document.getElementById("nextCard");

let currentIndex = 0;

// Flip durch Klick auf die Karte
cards.forEach((card) => {
  card.addEventListener("click", (ev) => {
    // Navigation nicht als Flip werten
    if (ev.target.closest(".nav-btn") || ev.target.closest(".nav-link")) return;
    card.classList.toggle("is-flipped");
  });
});

function showCard(index) {
  if (index < 0) index = cards.length - 1;
  if (index >= cards.length) index = 0;
  currentIndex = index;

  cards.forEach((card, i) => {
    const active = i === index;
    card.classList.toggle("active", active);
    if (active) {
      // Immer mit Vorderseite starten
      card.classList.remove("is-flipped");
    }
  });

  navLinks.forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });

  // MathJax neu rendern
  if (window.MathJax && window.MathJax.typesetPromise) {
    MathJax.typesetPromise();
  }
}

// Navigation
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

// Start
document.addEventListener("DOMContentLoaded", () => {
  showCard(0);
});
