const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const toggle = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// --- FİLO SLIDER KODU BAŞLANGICI ---
const track = document.querySelector(".fleet-track");
const prev = document.querySelector(".fleet-prev");
const next = document.querySelector(".fleet-next");

let position = 0;

// next butonuna tıklayınca slider kayar
next.addEventListener("click", () => {
  // toplam slider genişliği ve görünüm genişliğine göre limit eklenebilir
  position -= 340; // kart genişliği + gap
  // max kayma kontrolü (opsiyonel)
  const maxPosition = -(track.scrollWidth - track.clientWidth);
  if (position < maxPosition) position = maxPosition;
  track.style.transform = `translateX(${position}px)`;
});

// prev butonuna tıklayınca slider geri gelir
prev.addEventListener("click", () => {
  position += 340;
  if (position > 0) position = 0;
  track.style.transform = `translateX(${position}px)`;
});
// --- FİLO SLIDER KODU BİTİŞİ ---
