// Flippen der aktiven Karte beim Klick
function attachFlipHandler(card) {
  card.addEventListener("click", (ev) => {
    // Klicks auf Buttons am Rand ignorieren
    if (ev.target.closest(".nav-btn") || ev.target.closest(".nav-link")) return;
    card.classList.toggle("flipped");
  });
}

const cards = Array.from(document.querySelectorAll(".card"));
cards.forEach(attachFlipHandler);

let currentIndex = 0;

const prevBtn = document.getElementById("prevCard");
const nextBtn = document.getElementById("nextCard");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));

function showCard(index) {
  if (index < 0) index = cards.length - 1;
  if (index >= cards.length) index = 0;
  currentIndex = index;

  cards.forEach((card, i) => {
    card.classList.toggle("active", i === currentIndex);
    // Karte zurückdrehen, wenn sie neu angezeigt wird
    if (i === currentIndex) {
      card.classList.remove("flipped");
    }
  });

  navLinks.forEach((btn, i) => {
    btn.classList.toggle("active", i === currentIndex);
  });
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

// Optional: mit Pfeiltasten wechseln
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    showCard(currentIndex + 1);
  } else if (e.key === "ArrowLeft") {
    showCard(currentIndex - 1);
  }
});
