/* script.js — all website behavior. You normally do not need to edit this file. */
(() => {
  const data = window.SITE_DATA;
  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Shown automatically if a photo path is wrong or the file is missing
  const PLACEHOLDER_IMG = "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="600" height="600" fill="#F8D7DA"/>' +
    '<text x="300" y="320" font-size="96" text-anchor="middle" fill="#E8A0AA">♥</text>' +
    '<text x="300" y="380" font-size="24" text-anchor="middle" fill="#713D4A" font-family="sans-serif">Add your photo</text></svg>');

  function setImage(img, src, alt) {
    img.alt = alt || "";
    img.onerror = () => { img.onerror = null; img.src = PLACEHOLDER_IMG; };
    img.src = src;
  }

  /* ---------- Fill text from data.js ---------- */
  document.title = data.greeting;
  $("navName").textContent = data.name;
  $("heroGreeting").textContent = data.greeting;
  $("heroIntro").textContent = data.intro;
  $("letterTo").textContent = data.letterGreeting;
  $("surpriseText").textContent = data.surpriseMessage;
  $("finalText").textContent = data.finalMessage;
  setImage($("mainPhoto"), data.mainPhoto, "Photo of " + data.name);

  /* ---------- Mobile menu ---------- */
  const navToggle = $("navToggle");
  const navLinks = $("navLinks");
  function setMenu(open) {
    navLinks.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  }
  navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
  navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  // Highlight the link of the section currently on screen
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.querySelectorAll("a").forEach((a) =>
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section").forEach((s) => sectionObserver.observe(s));

  /* ---------- Letter typing animation (runs once when visible) ---------- */
  const letterBody = $("letterBody");
  let typed = false;
  function typeLetter() {
    if (typed) return;
    typed = true;
    const text = data.letter;
    if (reduceMotion) { letterBody.textContent = text; return; }
    let i = 0;
    letterBody.classList.add("is-typing");
    (function step() {
      if (letterBody.dataset.skipped) return;
      letterBody.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(step, 28);
      else letterBody.classList.remove("is-typing");
    })();
  }
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) { typeLetter(); obs.disconnect(); }
  }, { threshold: 0.35 }).observe($("message"));
  // Click the letter to skip the typing animation
  letterBody.addEventListener("click", () => {
    typed = true;
    letterBody.dataset.skipped = "1";
    letterBody.classList.remove("is-typing");
    letterBody.textContent = data.letter;
  });

  /* ---------- Gallery + lightbox ---------- */
  const grid = $("galleryGrid");
  const lightbox = $("lightbox");
  const lbImg = $("lbImg");
  const lbCaption = $("lbCaption");
  let current = 0;
  let lastFocus = null;

  data.gallery.forEach((item, index) => {
    const card = document.createElement("button");
    card.className = "gallery__card";
    card.type = "button";
    const img = document.createElement("img");
    img.loading = "lazy";
    setImage(img, item.src, item.caption);
    const cap = document.createElement("span");
    cap.textContent = item.caption;
    card.append(img, cap);
    card.addEventListener("click", () => openLightbox(index));
    grid.appendChild(card);
  });

  function showPhoto(index) {
    const n = data.gallery.length;
    current = (index + n) % n;
    lbImg.classList.add("is-fading");
    setTimeout(() => {
      setImage(lbImg, data.gallery[current].src, data.gallery[current].caption);
      lbCaption.textContent = data.gallery[current].caption;
      lbImg.classList.remove("is-fading");
    }, reduceMotion ? 0 : 150);
  }
  function openLightbox(index) {
    lastFocus = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
    showPhoto(index);
    $("lbClose").focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }
  $("lbClose").addEventListener("click", closeLightbox);
  $("lbPrev").addEventListener("click", () => showPhoto(current - 1));
  $("lbNext").addEventListener("click", () => showPhoto(current + 1));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPhoto(current - 1);
    if (e.key === "ArrowRight") showPhoto(current + 1);
  });
  // Swipe left/right on phones
  let touchX = null;
  lightbox.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showPhoto(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Countdown ---------- */
  const target = new Date(data.birthdayDate).getTime();
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    if (Number.isNaN(target)) {
      $("timer").hidden = true;
      $("countdownDone").hidden = false;
      $("countdownDone").textContent = "Check birthdayDate in js/data.js (format: YYYY-MM-DDTHH:MM:SS).";
      return false;
    }
    const diff = target - Date.now();
    if (diff <= 0) {
      $("timer").hidden = true;
      $("countdownTitle").textContent = "Today Is The Day";
      $("countdownDone").hidden = false;
      $("countdownDone").textContent = data.countdownDoneMessage;
      return false;
    }
    $("cdDays").textContent = Math.floor(diff / 86400000);
    $("cdHours").textContent = pad(Math.floor(diff / 3600000) % 24);
    $("cdMinutes").textContent = pad(Math.floor(diff / 60000) % 60);
    $("cdSeconds").textContent = pad(Math.floor(diff / 1000) % 60);
    return true;
  }
  if (tick()) {
    const timerId = setInterval(() => { if (!tick()) clearInterval(timerId); }, 1000);
  }

  /* ---------- Surprise envelope ---------- */
  const envelope = $("envelope");
  const reveal = $("reveal");
  function openEnvelope() {
    envelope.classList.add("is-open");
    envelope.setAttribute("aria-expanded", "true");
    $("surpriseHint").hidden = true;
    setTimeout(() => { reveal.hidden = false; burstHearts(); }, reduceMotion ? 0 : 450);
  }
  function closeEnvelope() {
    reveal.hidden = true;
    envelope.classList.remove("is-open");
    envelope.setAttribute("aria-expanded", "false");
    $("surpriseHint").hidden = false;
    envelope.focus();
  }
  envelope.addEventListener("click", () => { if (!envelope.classList.contains("is-open")) openEnvelope(); });
  $("closeSurprise").addEventListener("click", closeEnvelope);

  /* ---------- Floating hearts ---------- */
  const heartLayer = $("hearts");
  function spawnHeart(burst) {
    const heart = document.createElement("span");
    heart.textContent = "♥";
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 10 + Math.random() * 14 + "px";
    const seconds = burst ? 4 + Math.random() * 2 : 9 + Math.random() * 6;
    heart.style.animationDuration = seconds + "s";
    heartLayer.appendChild(heart);
    setTimeout(() => heart.remove(), seconds * 1000);
  }
  function burstHearts() { if (!reduceMotion) for (let i = 0; i < 14; i++) setTimeout(() => spawnHeart(true), i * 90); }
  if (!reduceMotion) setInterval(() => { if (!document.hidden) spawnHeart(false); }, 1800);

  /* ---------- Music player (never autoplays) ---------- */
  const audio = $("bgMusic");
  const musicBtn = $("musicBtn");
  function setMusicUI(on) {
    musicBtn.setAttribute("aria-pressed", String(on));
    $("musicIcon").textContent = on ? "❚❚" : "▶";
    $("musicLabel").textContent = on ? "Pause music" : "Play music";
    $("musicStatus").textContent = on ? "♪ Music on" : "Music off";
    $("musicStatus").classList.toggle("is-on", on);
  }
  if (data.music) audio.src = data.music;
  musicBtn.addEventListener("click", () => {
    if (!data.music) { $("musicStatus").textContent = "No music file set"; return; }
    if (audio.paused) {
      audio.play().then(() => setMusicUI(true))
        .catch(() => { setMusicUI(false); $("musicStatus").textContent = "Music file not found"; });
    } else {
      audio.pause();
      setMusicUI(false);
    }
  });
  audio.addEventListener("error", () => { setMusicUI(false); $("musicStatus").textContent = "Music file not found"; });
})();
