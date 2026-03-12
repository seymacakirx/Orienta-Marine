document.addEventListener("DOMContentLoaded", () => {
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

  if (track && prev && next) {
    let position = 0;
    const cardWidth = track.querySelector(".fleet-card").offsetWidth + 20; // 20 = gap

    const updateSlider = () => {
      const maxPosition = -(track.scrollWidth - track.clientWidth);
      if (position < maxPosition) position = maxPosition;
      if (position > 0) position = 0;
      track.style.transform = `translateX(${position}px)`;
    };

    next.addEventListener("click", () => {
      position -= cardWidth;
      updateSlider();
    });

    prev.addEventListener("click", () => {
      position += cardWidth;
      updateSlider();
    });

    // Mobilde parmakla kaydırma
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    track.addEventListener("pointerdown", e => {
      isDragging = true;
      startX = e.clientX;
      track.style.cursor = "grabbing";
      track.style.transition = "none";
    });

    track.addEventListener("pointermove", e => {
      if (!isDragging) return;
      currentX = e.clientX;
      const diff = currentX - startX;
      track.style.transform = `translateX(${position + diff}px)`;
    });

    track.addEventListener("pointerup", e => {
      if (!isDragging) return;
      isDragging = false;
      track.style.cursor = "grab";
      const diff = currentX - startX;
      if (Math.abs(diff) > cardWidth / 4) {
        position += diff > 0 ? cardWidth : -cardWidth;
      }
      track.style.transition = "transform .4s ease";
      updateSlider();
    });

    track.addEventListener("pointerleave", e => {
      if (!isDragging) return;
      isDragging = false;
      track.style.cursor = "grab";
      const diff = currentX - startX;
      if (Math.abs(diff) > cardWidth / 4) {
        position += diff > 0 ? cardWidth : -cardWidth;
      }
      track.style.transition = "transform .4s ease";
      updateSlider();
    });
  }
  // --- FİLO SLIDER KODU BİTİŞİ ---

  // --- NAVBAR LINKLERİ İÇİN TOPBAR OFFSET SCROLL ---
  document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const topOffset = 76; // topbar yüksekliği
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const scrollPosition = elementPosition - topOffset;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    });
  });
  // --- SCROLL KODU BİTİŞİ ---
});
