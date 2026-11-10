const IMG = "./assets/images/";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const projects = [
  {
    title: "Rebirth to the World",
    sub: "Award-winning 2D platformer — Game Day 2024 winner",
    tag: "Game · C / SDL · 2024",
    cover: IMG + "rebirthed/rebirth_logo.png", contain: true,
    desc: "A 2D side-scrolling platformer developed in C using SDL. It won top honors at Game Day 2024 and was featured at Esprit's Digital Knights event. A multi-level adventure with dynamic combat, interactive storytelling, puzzle integration and Arduino controller support — classic platforming in a medieval fantasy world.",
    skills: ["C Language", "SDL Framework", "Game Development", "Graphics Programming", "2D Animation", "Physics Engine", "Audio Programming", "Arduino Integration", "Collision Detection", "Level Design", "Character Animation", "Combat System", "Save System", "Minimap System"],
    media: [IMG + "rebirthed/rebirth_posterr.png"],
    video: "https://www.youtube.com/embed/G5VGV8nTPTQ",
    link: "https://github.com/madaradou/rebirthed",
  },
  {
    title: "Clansy",
    sub: "Smart cleaning management platform with IoT",
    tag: "IoT · Qt / C++",
    cover: IMG + "cleansy/logo.png", contain: true,
    desc: "Digital transformation of cleaning companies through IoT: automating task management, improving coordination with teams and clients, personalizing services and optimizing operational efficiency with a sustainable approach. Built with Qt and C++ for a robust desktop experience, IoT integration and analytics.",
    skills: ["Qt Framework", "C++", "Arduino", "SQL", "RFID", "QML", "Charts & Analytics", "QR Code/Barcode", "Mapping Services", "Serial Communication", "PDF/Excel Export", "Email/SMS", "Fleet Management", "IoT Integration"],
    media: [IMG + "cleansy/poster.png"],
    link: "https://github.com/madaradou/hoteliasmartweb",
  },
  {
    title: "Portfolio Website",
    sub: "Showcase your work",
    tag: "Web · HTML / CSS / JS",
    cover: IMG + "Portfolio-Website.webp",
    desc: "A personal portfolio website with animations, project highlights and a contact form. Built using HTML, CSS and JavaScript to create an eye-catching presentation.",
    skills: ["HTML", "CSS", "JavaScript", "Animation"],
  },
  {
    title: "Task Manager App",
    sub: "Boost productivity",
    tag: "Web · Vue.js",
    cover: IMG + "task-managment.webp",
    desc: "A to-do list and task management app featuring drag-and-drop, priority sorting and local storage. Created using Vue.js for a modern, fast and responsive experience.",
    skills: ["Vue.js", "Drag & Drop", "Local Storage"],
  },
  {
    title: "Weather Forecast App",
    sub: "Real-time weather updates",
    tag: "Web · JavaScript · API",
    cover: IMG + "Weather-Forecast-App.webp",
    desc: "A weather app with real-time updates, temperature details and forecasts based on user location. Developed with JavaScript and the OpenWeather API.",
    skills: ["JavaScript", "OpenWeather API", "Geolocation"],
  },
];

/* ---------- Preloader ---------- */
const splitText = () => $$(".split").forEach((el) => {
  el.innerHTML = [...el.textContent].map((c, i) => `<span class="ch" style="transition-delay:${i * 45}ms">${c}</span>`).join("");
});
splitText();

(function preload() {
  const num = $("#loader-num");
  const start = performance.now(), dur = reduced ? 1 : 1600;
  const tick = (t) => {
    const p = Math.min((t - start) / dur, 1);
    num.textContent = Math.round((1 - Math.pow(1 - p, 3)) * 100);
    if (p < 1) return requestAnimationFrame(tick);
    $("#loader").classList.add("done");
    document.body.classList.remove("is-loading");
    document.body.classList.add("ready");
    setTimeout(() => $$(".split").forEach((s) => s.classList.add("in")), 300);
  };
  requestAnimationFrame(tick);
})();

/* ---------- Cursor + magnetic ---------- */
const dot = $(".cursor-dot"), ring = $(".cursor-ring");
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
(function follow() {
  rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
  ring.style.transform = `translate(${rx}px,${ry}px)`;
  requestAnimationFrame(follow);
})();
document.addEventListener("pointerover", (e) => ring.classList.toggle("hover", !!e.target.closest("a, button, .wheel-card")));

$$(".magnetic").forEach((el) => {
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
  });
  el.addEventListener("pointerleave", () => (el.style.transform = ""));
});

/* ---------- Nav ---------- */
const nav = $("#nav"), burger = $(".burger"), drawer = $("#drawer");
const toggleDrawer = (open) => {
  drawer.classList.toggle("open", open); burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
};
burger.addEventListener("click", () => toggleDrawer(!drawer.classList.contains("open")));
$$("#drawer a").forEach((a) => a.addEventListener("click", () => toggleDrawer(false)));

const navObs = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (en.isIntersecting) $$(".nav-links a").forEach((a) => a.classList.toggle("active", a.hash === "#" + en.target.id));
}), { rootMargin: "-45% 0px -45% 0px" });
$$("main section[id]").forEach((s) => navObs.observe(s));

/* ---------- Reveal + counters ---------- */
const countUp = (el) => {
  const to = +el.dataset.to, t0 = performance.now();
  const step = (t) => { const p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
};
const revObs = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (!en.isIntersecting) return;
  en.target.classList.add("in");
  $$(".count", en.target).forEach(countUp);
  revObs.unobserve(en.target);
}), { threshold: 0.15 });
$$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 80}ms`; revObs.observe(el); });

/* ---------- Scroll-driven: progress, about expand, horizontal experience ---------- */
const about = $(".sem"), semSticky = $(".sem-sticky");
const exp = $("#experience"), track = $(".exp-track"), expBar = $(".exp-bar");
const sectionProgress = (sec) => {
  const r = sec.getBoundingClientRect();
  return Math.min(Math.max(-r.top / (r.height - innerHeight), 0), 1);
};
let lastY = scrollY;
const onScroll = () => {
  const y = scrollY;
  $("#progress").style.transform = `scaleX(${y / (document.documentElement.scrollHeight - innerHeight)})`;
  nav.classList.toggle("hide", y > lastY && y > 400 && !drawer.classList.contains("open"));
  lastY = y;
  if (reduced) return;

  // about card fills the screen over the first 60% of the section's scroll
  const p = Math.min(sectionProgress(about) / 0.6, 1);
  semSticky.style.setProperty("--p", p.toFixed(4));
  semSticky.style.setProperty("--bgo", (1 - p).toFixed(3));

  const ep = sectionProgress(exp);
  track.style.transform = `translate3d(${-(track.scrollWidth - innerWidth) * ep}px,0,0)`;
  expBar.style.setProperty("--ep", ep);
};
addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
addEventListener("resize", onScroll);
onScroll();

/* ---------- Works: 3D drum wheel ---------- */
const wheel = $(".wheel"), info = $(".wheel-info");
const STEP = 36, RADIUS = 400; // ~ card height / (2·tan(STEP/2)) so cards touch
const ringEl = document.createElement("div");
ringEl.className = "wheel-ring";
ringEl.innerHTML = projects.map((p, i) =>
  `<div class="wheel-card" data-i="${i}" data-n="${String(i + 1).padStart(2, "0")}" style="transform:rotateX(${-i * STEP}deg) translateZ(${RADIUS}px)">
     <img src="${p.cover}" alt="${p.title}" class="${p.contain ? "contain" : ""}" draggable="false"></div>`).join("");
wheel.appendChild(ringEl);
const cards = $$(".wheel-card", ringEl);

let pos = 0, target = 0, shown = -1;
const clamp = (v) => Math.max(0, Math.min(projects.length - 1, v));
const go = (i) => (target = clamp(i));

const showInfo = (i) => {
  if (i === shown) return;
  shown = i;
  info.classList.add("swap");
  setTimeout(() => {
    $(".wheel-idx").textContent = `${String(i + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
    $(".wheel-title").textContent = projects[i].title;
    $(".wheel-sub").textContent = projects[i].sub;
    info.classList.remove("swap");
  }, 200);
  cards.forEach((c, k) => c.classList.toggle("active", k === i));
};
(function spin() {
  pos += (target - pos) * 0.12;
  ringEl.style.transform = `translateZ(${-RADIUS}px) rotateX(${pos * STEP}deg)`;
  showInfo(Math.round(pos));
  requestAnimationFrame(spin);
})();

let dragY = null, dragStart = 0, moved = false;
wheel.addEventListener("pointerdown", (e) => { dragY = e.clientY; dragStart = target; moved = false; wheel.setPointerCapture(e.pointerId); });
wheel.addEventListener("pointermove", (e) => {
  if (dragY === null) return;
  const dy = e.clientY - dragY;
  if (Math.abs(dy) > 4) moved = true;
  target = Math.max(-0.4, Math.min(projects.length - 0.6, dragStart - dy / 120));
});
wheel.addEventListener("pointerup", (e) => {
  if (dragY === null) return;
  dragY = null;
  if (!moved) {
    const card = document.elementFromPoint(e.clientX, e.clientY)?.closest(".wheel-card");
    if (card) +card.dataset.i === Math.round(pos) ? openModal(+card.dataset.i) : go(+card.dataset.i);
  }
  go(Math.round(target));
});
let wheelLock = 0;
wheel.addEventListener("wheel", (e) => {
  const dir = Math.sign(e.deltaY), next = clamp(Math.round(target) + dir);
  if (next === Math.round(target)) return; // at an end: let the page scroll on
  e.preventDefault();
  if (Date.now() - wheelLock < 350) return;
  wheelLock = Date.now(); go(next);
}, { passive: false });
wheel.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") { e.preventDefault(); go(Math.round(target) + 1); }
  if (e.key === "ArrowUp") { e.preventDefault(); go(Math.round(target) - 1); }
  if (e.key === "Enter") openModal(Math.round(target));
});
$(".wheel-open").addEventListener("click", () => openModal(Math.round(target)));

/* ---------- Modal ---------- */
const modal = $("#modal"), body = $(".modal-body");
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
let lastFocus = null;
function openModal(i) {
  const p = projects[i];
  body.innerHTML = `
    <div class="modal-hero"><img src="${p.cover}" alt="" class="${p.contain ? "contain" : ""}"></div>
    <div class="modal-inner">
      <span class="tag">${esc(p.tag)}</span>
      <h2 id="m-title">${esc(p.title)}</h2>
      <p>${esc(p.desc)}</p>
      <h4>Skills & Technologies</h4>
      <div class="chips">${p.skills.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
      ${p.media ? `<h4>Event poster</h4><div class="modal-media">${p.media.map((m) => `<img src="${m}" alt="${esc(p.title)} poster">`).join("")}</div>` : ""}
      ${p.video ? `<h4>Demo</h4><div class="video"><iframe src="${p.video}" title="${esc(p.title)} trailer" allowfullscreen loading="lazy"></iframe></div>` : ""}
      ${p.link ? `<a class="btn btn-dark" href="${p.link}" target="_blank" rel="noopener">View on GitHub ↗</a>` : ""}
    </div>`;
  lastFocus = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  $(".modal-close").focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  setTimeout(() => { if (!modal.classList.contains("open")) body.innerHTML = ""; }, 500); // stops the video
  lastFocus?.focus();
}
$(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => e.target === modal && closeModal());
addEventListener("keydown", (e) => e.key === "Escape" && modal.classList.contains("open") && closeModal());

/* ---------- Toast + footer ---------- */
const toast = (msg) => {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2200);
};
$$("a[download]").forEach((a) => a.addEventListener("click", () => toast("Downloading resume…")));
$("#year").textContent = new Date().getFullYear();
