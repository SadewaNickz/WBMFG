/*
╔════════════════════════════════════════════════════╗
║                  js/opening.js                     ║
║  Semua logika layar pembuka (opening slide) ada    ║
║  di sini. Ubah kalimat, durasi, dan musik di sini. ║
╚════════════════════════════════════════════════════╝
*/

/* ──────────────────────────────────────────────────
   ✏️  KALIMAT OPENING
   Setiap string = satu slide yang muncul bergantian.
   Tambah, kurangi, atau ubah sesukamu!
   Gunakan \n untuk baris baru dalam satu slide.

   Contoh baris baru:
   "Kamu tuh spesial banget\ndi mata aku 🌸"
────────────────────────────────────────────────── */
const slides = [
  "Halo fell....",
  "Maaf ya kalo aku sering bikin kamu sedih 🥺",
  "Bikin kamu nangis juga",
  "Aku sayang banget sama kamu.. 🥺",
  "Sebenarnya udah lama aku pengen bilang ini...",
  "Tapi selalu gugup tiap kali mau ngomong 😅",
  "Jadi aku bikin ini khusus buat kamu 💌",
  "Ada satu pertanyaan penting...",
  "PRENKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK",
  "Gk deng boong, aku cuma mau bilang...",
  "Jadi......",
];

/* ──────────────────────────────────────────────────
   ⏱️  DURASI SLIDE  (dalam milidetik)
   SLIDE_DURATION  = berapa lama teks ditampilkan
   SLIDE_FADE      = durasi animasi fade (jangan diubah
                     kecuali kamu juga ubah CSS-nya)
────────────────────────────────────────────────── */
const SLIDE_DURATION = 2400;
const SLIDE_FADE = 700;

/* ──────────────────────────────────────────────────
   🎵  VOLUME MUSIK  (0.0 – 1.0)
   Musik mulai otomatis setelah opening selesai.
   Pastikan nama file sudah benar di index.html.
────────────────────────────────────────────────── */
const MUSIC_VOLUME = 0.5;

/* ──────────────────────────────────────────────────
   LOGIKA INTERNAL — tidak perlu diubah
────────────────────────────────────────────────── */
let currentSlide = 0;
let slideTimer = null;

function buildDots() {
  const container = document.getElementById("slide-dots");
  container.innerHTML = "";
  slides.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " active" : "");
    container.appendChild(d);
  });
}

function updateDots(idx) {
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === idx);
  });
}

function showSlide(idx) {
  const el = document.getElementById("slide-text");

  // Fade out
  el.classList.remove("visible");
  el.classList.add("hidden");

  setTimeout(() => {
    el.innerHTML = slides[idx].replace(/\n/g, "<br>");
    el.classList.remove("hidden");
    void el.offsetWidth; // paksa reflow agar transisi berjalan
    el.classList.add("visible");
    updateDots(idx);
  }, SLIDE_FADE);
}

function nextSlide() {
  currentSlide++;
  if (currentSlide < slides.length) {
    showSlide(currentSlide);
    slideTimer = setTimeout(nextSlide, SLIDE_DURATION + SLIDE_FADE);
  } else {
    finishOpening();
  }
}

function finishOpening() {
  clearTimeout(slideTimer);
  const opening = document.getElementById("opening");
  opening.classList.add("exit");

  setTimeout(() => {
    opening.style.display = "none";
    document.getElementById("main-card-wrapper").classList.add("show");
    tryPlayMusic();
  }, 850);
}

// Tombol "Lewati" di pojok kanan bawah
function skipOpening() {
  finishOpening();
}

function tryPlayMusic() {
  const music = document.getElementById("bg-music");
  if (!music) return;
  music.volume = MUSIC_VOLUME;
  music.play().catch(() => {
    // Browser memblok autoplay — tidak apa-apa, user bisa klik manual
  });
}

// Mulai saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  buildDots();
  showSlide(0);
  slideTimer = setTimeout(nextSlide, SLIDE_DURATION + SLIDE_FADE);
});
