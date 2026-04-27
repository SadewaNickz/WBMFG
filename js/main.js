/*
╔════════════════════════════════════════════════════╗
║                   js/main.js                       ║
║  Semua interaksi halaman utama ada di sini:        ║
║  - Tombol YES (confetti + popup)                   ║
║  - Tombol NO (kabur saat di-hover)                 ║
║  - Floating hearts background                      ║
╚════════════════════════════════════════════════════╝
*/

/* ──────────────────────────────────────────────────
   ✏️  TEKS LUCU saat tombol NO di-hover
   Tambah, kurangi, atau ubah sesukamu!
────────────────────────────────────────────────── */
const noMessages = [
  "Yakin nih? 😏",
  "Coba pikir lagi 😌",
  "Masa nolak sih 🥺",
  "Klik YES aja lebih gampang 😎",
  "Jangan gitu dong 😭",
  "Aku udah mandi lho hari ini 🚿",
  "Please... 🙏",
  "Tombolnya lari terus, pertanda apa tuh? 😂",
  "Hati nurani kamu pasti mau YES 💗",
  "Kata dokter, bilang YES itu menyehatkan 🩺",
];

/* ──────────────────────────────────────────────────
   🎨  WARNA CONFETTI
   Tambah hex warna lain jika mau lebih warna-warni
────────────────────────────────────────────────── */
const confettiColors = [
  "#3b82f6",
  "#93c5fd",
  "#bfdbfe",
  "#dbeafe",
  "#f472b6",
  "#fbcfe8",
  "#60a5fa",
  "#ffffff",
];

/* ──────────────────────────────────────────────────
   TOMBOL NO — kabur saat kursor mendekat
────────────────────────────────────────────────── */
let noCount = 0;

// Posisikan tombol NO tepat di sebelah kanan tombol YES saat load
function initBtnNo() {
  const btnNo = document.getElementById("btn-no");
  const yesRect = document.getElementById("btn-yes").getBoundingClientRect();

  btnNo.style.position = "fixed";
  btnNo.style.transition = "none";
  btnNo.style.left = yesRect.right + 18 + "px";
  btnNo.style.top = yesRect.top + "px";
}

// Hitung posisi random yang DIJAMIN tidak keluar dari viewport
function safePosition(btnNo, scale) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const bw = btnNo.offsetWidth * scale + 24;
  const bh = btnNo.offsetHeight * scale + 24;

  const minX = 16;
  const minY = 16;
  const maxX = Math.max(minX, vw - bw - 16);
  const maxY = Math.max(minY, vh - bh - 16);

  return {
    x: minX + Math.random() * (maxX - minX),
    y: minY + Math.random() * (maxY - minY),
  };
}

function runAway() {
  noCount++;
  const btnNo = document.getElementById("btn-no");
  const hintEl = document.getElementById("hint-text");

  // Tampilkan teks lucu random
  hintEl.textContent =
    noMessages[Math.floor(Math.random() * noMessages.length)];
  hintEl.style.animation = "none";
  void hintEl.offsetWidth;
  hintEl.style.animation = "wiggle 0.5s ease";

  // Counter setelah beberapa kali
  if (noCount > 2) {
    document.getElementById("no-counter").textContent =
      `Kamu udah kabur ${noCount}x... tapi YES-nya masih nunggu 😂`;
  }

  // Tombol makin kecil seiring sering di-hover
  const scale = Math.max(0.6, 1 - noCount * 0.04);
  const fontSize = Math.max(0.7, 1 - noCount * 0.03);

  const { x, y } = safePosition(btnNo, scale);
  const rotate = (Math.random() - 0.5) * 36;

  btnNo.style.transition = [
    "left 0.22s cubic-bezier(.22,1,.36,1)",
    "top 0.22s cubic-bezier(.22,1,.36,1)",
    "transform 0.22s ease",
    "font-size 0.3s",
  ].join(", ");

  btnNo.style.left = x + "px";
  btnNo.style.top = y + "px";
  btnNo.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
  btnNo.style.fontSize = fontSize + "rem";
}

document.getElementById("btn-no").addEventListener("mouseenter", runAway);
document
  .getElementById("btn-no")
  .addEventListener("touchstart", runAway, { passive: true });

/* ──────────────────────────────────────────────────
   TOMBOL YES — confetti + popup + background happy
────────────────────────────────────────────────── */
function onYes() {
  document.body.classList.add("happy");
  document.getElementById("popup").classList.add("show");
  document.getElementById("btn-no").style.display = "none";
  document.getElementById("hint-text").textContent = "🎉 Makasih ya sayang! 🎉";

  // Confetti 4 gelombang
  launchConfetti();
  launchConfetti();
  setTimeout(launchConfetti, 400);
  setTimeout(launchConfetti, 900);
}

function closePopup() {
  document.getElementById("popup").classList.remove("show");
}

/* ──────────────────────────────────────────────────
   CONFETTI
────────────────────────────────────────────────── */
function launchConfetti() {
  for (let i = 0; i < 60; i++) {
    setTimeout(createConfettiPiece, i * 22);
  }
}

function createConfettiPiece() {
  const el = document.createElement("div");
  const color =
    confettiColors[Math.floor(Math.random() * confettiColors.length)];
  const size = 6 + Math.random() * 10;
  const left = Math.random() * 100;
  const dur = 2.5 + Math.random() * 2;
  const isHeart = Math.random() > 0.6;

  el.className = "confetti-piece";
  el.style.cssText = `
    left: ${left}vw;
    width: ${size}px;
    height: ${size}px;
    background: ${isHeart ? "transparent" : color};
    border-radius: ${isHeart ? "50%" : "2px"};
    animation-duration: ${dur}s;
    font-size: ${size}px;
  `;
  if (isHeart) el.textContent = "❤️";

  document.body.appendChild(el);
  setTimeout(() => el.remove(), (dur + 0.5) * 1000);
}

/* ──────────────────────────────────────────────────
   FLOATING HEARTS BACKGROUND
────────────────────────────────────────────────── */
const heartEmojis = ["💙", "🩵", "💙", "🤍", "💗", "✨", "🩷", "💎"];

function createFloatingHeart() {
  const el = document.createElement("div");
  el.className = "floating-heart";
  el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = 0.8 + Math.random() * 1.2 + "rem";
  el.style.animationDuration = 8 + Math.random() * 10 + "s";
  el.style.animationDelay = Math.random() * 6 + "s";

  document.getElementById("hearts-bg").appendChild(el);
  setTimeout(() => el.remove(), 20000);
}

// Seeding awal + interval
for (let i = 0; i < 8; i++) createFloatingHeart();
setInterval(createFloatingHeart, 700);

/* ──────────────────────────────────────────────────
   INIT
────────────────────────────────────────────────── */
window.addEventListener("load", () => {
  setTimeout(initBtnNo, 300);
});
