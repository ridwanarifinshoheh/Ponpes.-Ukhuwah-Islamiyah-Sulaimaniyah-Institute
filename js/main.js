/**
 * main.js — Logika halaman utama Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute
 * ------------------------------------------------------------------------------
 * 1. TEMPEL URL WEB APP APPS SCRIPT KAMU DI BAWAH INI setelah deploy Code.gs.
 *    Lihat README.md bagian "Menghubungkan Code.gs (backend)".
 */
const APPS_SCRIPT_URL = "PASTE_URL_WEB_APP_APPS_SCRIPT_DI_SINI";

/* ============================================================
   0. Util: gabungkan data dasar (data.js) dengan "lapisan admin"
   yang tersimpan di localStorage (ditulis oleh admin.html).
   Kontrak penyimpanan (harus sama persis dengan admin.js):
     - psi_overlay_<jenis>  -> object { [id]: item }
     - psi_deleted_<jenis>  -> array of id yang disembunyikan
   ============================================================ */
function mergeWithOverlay(baseArray, jenis) {
  let overlay = {};
  let deleted = [];
  try { overlay = JSON.parse(localStorage.getItem(`psi_overlay_${jenis}`) || "{}"); } catch (e) {}
  try { deleted = JSON.parse(localStorage.getItem(`psi_deleted_${jenis}`) || "[]"); } catch (e) {}

  const map = new Map();
  baseArray.forEach(item => map.set(item.id, item));
  Object.values(overlay).forEach(item => map.set(item.id, item));
  deleted.forEach(id => map.delete(id));
  return Array.from(map.values());
}

const ICONS = {
  mosque: "fa-mosque", book: "fa-book-open", home: "fa-house", flask: "fa-flask",
  heart: "fa-heart-pulse", ball: "fa-futbol",
  coin: "fa-coins", building: "fa-building", scholar: "fa-graduation-cap", hands: "fa-hand-holding-heart"
};
const NEWS_ICONS = { pengumuman: "fa-bullhorn", kegiatan: "fa-people-group", artikel: "fa-feather-pointed" };

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
function formatTanggal(iso) {
  try {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  } catch (e) { return iso; }
}
function formatRupiah(n) {
  return "Rp" + Number(n || 0).toLocaleString("id-ID");
}

/* ============================================================
   1. Render — Header brand / hero / footer meta yang berulang
   ============================================================ */
function renderMeta() {
  document.getElementById("heroYears").textContent = (new Date().getFullYear() - SITE_DATA.profil.tahunBerdiri) + "+";
  document.getElementById("footerCopy").textContent =
    `© ${new Date().getFullYear()} ${SITE_DATA.profil.nama}. Seluruh hak cipta dilindungi.`;

  const wa = SITE_DATA.profil.whatsapp;
  document.getElementById("fabWa").href = `https://wa.me/${wa}?text=${encodeURIComponent("Assalamu'alaikum, saya ingin bertanya seputar " + SITE_DATA.profil.nama)}`;

  document.getElementById("mapFrame").querySelector("iframe").src =
    `https://www.google.com/maps?q=${encodeURIComponent(SITE_DATA.profil.mapsEmbedQuery)}&output=embed`;
}

/* ============================================================
   2. Stats counters
   ============================================================ */
function renderStats() {
  const wrap = document.getElementById("statsGrid");
  SITE_DATA.statistik.forEach(s => {
    wrap.appendChild(el(`
      <div class="stat">
        <strong data-count="${s.nilai}" data-suffix="${s.suffix}">0</strong>
        <span>${s.label}</span>
      </div>`));
  });
}
function animateCounters() {
  document.querySelectorAll("[data-count]").forEach(node => {
    const target = parseInt(node.dataset.count, 10);
    const suffix = node.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.round(eased * target).toLocaleString("id-ID") + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* ============================================================
   3. Tentang
   ============================================================ */
function renderAbout() {
  document.getElementById("aboutSejarah").textContent = SITE_DATA.profil.sejarah;
  document.getElementById("aboutSambutan").innerHTML =
    `“${SITE_DATA.profil.sambutan}”<footer>— Pengasuh Pesantren</footer>`;
  document.getElementById("aboutVisi").textContent = SITE_DATA.profil.visi;

  const list = document.getElementById("aboutMisi");
  SITE_DATA.profil.misi.forEach(m => {
    list.appendChild(el(`<li><span class="ic"><i class="fa-solid fa-check"></i></span><span>${m}</span></li>`));
  });
}

/* ============================================================
   4. Fasilitas
   ============================================================ */
function renderFasilitas() {
  const wrap = document.getElementById("facilityGrid");
  SITE_DATA.fasilitas.forEach(f => {
    wrap.appendChild(el(`
      <div class="facility-card reveal in">
        <div class="facility-ic"><i class="fa-solid ${ICONS[f.icon] || "fa-star"}"></i></div>
        <h3>${f.judul}</h3>
        <p>${f.deskripsi}</p>
      </div>`));
  });
}

/* ============================================================
   5. Galeri (filter + lightbox)
   ============================================================ */
const GALLERY_LABELS = { semua: "Semua", kegiatan: "Kegiatan", belajar: "Belajar", acara: "Acara", fasilitas: "Fasilitas" };
let galleryData = [];

function renderGalleryFilters() {
  const cats = ["semua", ...new Set(galleryData.map(g => g.kategori))];
  const wrap = document.getElementById("galleryFilters");
  cats.forEach((c, i) => {
    const btn = el(`<button class="gfilter ${i === 0 ? "active" : ""}" data-cat="${c}">${GALLERY_LABELS[c] || c}</button>`);
    btn.addEventListener("click", () => {
      document.querySelectorAll(".gfilter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderGalleryGrid(c);
    });
    wrap.appendChild(btn);
  });
}
function renderGalleryGrid(filter) {
  const grid = document.getElementById("galleryGrid");
  const empty = document.getElementById("galleryEmpty");
  grid.innerHTML = "";
  const items = filter === "semua" ? galleryData : galleryData.filter(g => g.kategori === filter);
  empty.hidden = items.length > 0;
  items.forEach(g => {
    const card = el(`
      <div class="gitem" tabindex="0" role="button" aria-label="Lihat foto: ${g.judul}">
        ${g.img
          ? `<img src="${g.img}" alt="${g.judul}" loading="lazy">`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--emerald-soft);color:var(--emerald)"><i class="fa-solid fa-image" style="font-size:1.6rem"></i></div>`}
        <span class="gcap">${g.judul}</span>
      </div>`);
    const open = () => openLightbox(g);
    card.addEventListener("click", open);
    card.addEventListener("keypress", e => { if (e.key === "Enter") open(); });
    grid.appendChild(card);
  });
}
function openLightbox(g) {
  document.getElementById("lightboxImg").src = g.img || "";
  document.getElementById("lightboxImg").alt = g.judul;
  document.getElementById("lightboxCap").textContent = g.judul;
  document.getElementById("lightbox").classList.add("open");
}
function initGallery() {
  galleryData = mergeWithOverlay(SITE_DATA.galeri, "galeri");
  renderGalleryFilters();
  renderGalleryGrid("semua");
  document.getElementById("lightboxClose").addEventListener("click", () => document.getElementById("lightbox").classList.remove("open"));
  document.getElementById("lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") e.currentTarget.classList.remove("open"); });
}

/* ============================================================
   6. Berita / Informasi
   ============================================================ */
function initNews() {
  const items = mergeWithOverlay(SITE_DATA.berita, "berita").sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  const grid = document.getElementById("newsGrid");
  items.forEach(n => {
    const card = el(`
      <article class="news-card">
        <div class="news-thumb"><i class="fa-solid ${NEWS_ICONS[n.kategori] || "fa-newspaper"}"></i></div>
        <div class="news-body">
          <div class="news-meta"><span>${n.kategori}</span><span>·</span><span>${formatTanggal(n.tanggal)}</span></div>
          <h3>${n.judul}</h3>
          <p>${n.ringkasan}</p>
          <span class="news-more">Baca selengkapnya <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </article>`);
    card.addEventListener("click", () => {
      document.getElementById("newsModalMeta").textContent = `${n.kategori} · ${formatTanggal(n.tanggal)}`;
      document.getElementById("newsModalTitle").textContent = n.judul;
      document.getElementById("newsModalBody").textContent = n.isi;
      document.getElementById("newsModal").classList.add("open");
    });
    grid.appendChild(card);
  });
  document.getElementById("newsModalClose").addEventListener("click", () => document.getElementById("newsModal").classList.remove("open"));
  document.getElementById("newsModal").addEventListener("click", e => { if (e.target.id === "newsModal") e.currentTarget.classList.remove("open"); });
}

/* ============================================================
   7. Donasi — program, rekening, dan select di form
   ============================================================ */
function renderDonasi() {
  const wrap = document.getElementById("donationPrograms");
  SITE_DATA.donasiProgram.forEach(p => {
    wrap.appendChild(el(`
      <div class="dprogram">
        <div class="ic"><i class="fa-solid ${ICONS[p.icon] || "fa-hand-holding-heart"}"></i></div>
        <h3>${p.judul}</h3>
        <p>${p.deskripsi}</p>
      </div>`));
  });

  const select = document.getElementById("d_program");
  SITE_DATA.donasiProgram.forEach(p => select.appendChild(el(`<option value="${p.judul}">${p.judul}</option>`)));

  const bankList = document.getElementById("bankList");
  SITE_DATA.rekening.forEach(r => {
    const row = el(`
      <div class="bank-row">
        <div>
          <strong>${r.nomor}</strong>
          <span>${r.bank} — a.n. ${r.atasNama}</span>
        </div>
        <button type="button" class="copy-btn">Salin</button>
      </div>`);
    row.querySelector(".copy-btn").addEventListener("click", (e) => {
      navigator.clipboard.writeText(r.nomor).then(() => {
        e.target.textContent = "Tersalin!";
        setTimeout(() => (e.target.textContent = "Salin"), 1500);
      });
    });
    bankList.appendChild(row);
  });
}

/* ============================================================
   8. Testimoni slider
   ============================================================ */
function initTesti() {
  const track = document.getElementById("testiTrack");
  const dots = document.getElementById("testiDots");
  let index = 0;

  SITE_DATA.testimoni.forEach((t, i) => {
    track.appendChild(el(`
      <div class="testi-card">
        <p>“${t.isi}”</p>
        <div class="testi-avatar">${t.nama.charAt(0)}</div>
        <div class="testi-name">${t.nama}</div>
        <div class="testi-role">${t.peran}</div>
      </div>`));
    const dot = el(`<button class="testi-dot ${i === 0 ? "active" : ""}" aria-label="Testimoni ${i + 1}"></button>`);
    dot.addEventListener("click", () => goTo(i));
    dots.appendChild(dot);
  });

  function goTo(i) {
    index = (i + SITE_DATA.testimoni.length) % SITE_DATA.testimoni.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll(".testi-dot").forEach((d, di) => d.classList.toggle("active", di === index));
  }
  document.getElementById("testiPrev").addEventListener("click", () => goTo(index - 1));
  document.getElementById("testiNext").addEventListener("click", () => goTo(index + 1));

  let auto = setInterval(() => goTo(index + 1), 6000);
  track.closest(".testi-track-wrap").addEventListener("mouseenter", () => clearInterval(auto));
  track.closest(".testi-track-wrap").addEventListener("mouseleave", () => (auto = setInterval(() => goTo(index + 1), 6000)));
}

/* ============================================================
   9. FAQ accordion
   ============================================================ */
function initFaq() {
  const wrap = document.getElementById("faqList");
  SITE_DATA.faq.forEach(f => {
    const item = el(`
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          <span>${f.q}</span><span class="plus"></span>
        </button>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`);
    const btn = item.querySelector(".faq-q");
    const answer = item.querySelector(".faq-a");
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i => { i.classList.remove("open"); i.querySelector(".faq-a").style.maxHeight = null; i.querySelector(".faq-q").setAttribute("aria-expanded", "false"); });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
    wrap.appendChild(item);
  });
}

/* ============================================================
   10. Kontak
   ============================================================ */
function renderContact() {
  const p = SITE_DATA.profil;
  const wrap = document.getElementById("contactInfo");
  wrap.innerHTML = `
    <div class="contact-row"><span class="ic"><i class="fa-solid fa-location-dot"></i></span><div><strong>Alamat</strong><span>${p.alamat}, ${p.kota}</span></div></div>
    <div class="contact-row"><span class="ic"><i class="fa-solid fa-phone"></i></span><div><strong>Telepon / WhatsApp</strong><span><a href="tel:${p.telepon}">${p.telepon}</a></span></div></div>
    <div class="contact-row"><span class="ic"><i class="fa-solid fa-envelope"></i></span><div><strong>Email</strong><span><a href="mailto:${p.email}">${p.email}</a></span></div></div>
    <div class="contact-row"><span class="ic"><i class="fa-solid fa-clock"></i></span><div><strong>Jam Operasional</strong><span>${p.jamOperasional}</span></div></div>`;

  document.getElementById("socialRow").innerHTML = `
    <a href="${p.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
    <a href="${p.facebook}" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
    <a href="${p.youtube}" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>`;

  document.getElementById("footerContact").innerHTML = `
    <li>${p.alamat}</li>
    <li><a href="tel:${p.telepon}">${p.telepon}</a></li>
    <li><a href="mailto:${p.email}">${p.email}</a></li>`;
}

/* ============================================================
   11. Navigasi: hamburger, active-link, reveal-on-scroll, back-to-top
   ============================================================ */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }));

  const sections = [...document.querySelectorAll("main section[id]")];
  const navA = [...links.querySelectorAll("a")];
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navA.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  sections.forEach(s => obs.observe(s));
}
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("in"); obs.unobserve(entry.target); } });
  }, { threshold: 0.15 });
  items.forEach(i => obs.observe(i));
}
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 500));
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
function initStatsAnimation() {
  const target = document.getElementById("statsGrid");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { animateCounters(); obs.disconnect(); } });
  }, { threshold: 0.4 });
  obs.observe(target);
}

/* ============================================================
   12. Kirim form ke Apps Script (Google Sheets)
   ============================================================ */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function kirimKeAppsScript(payload, statusEl, btnEl, pesanSukses) {
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQr951EWeMudHKC2NLqxN6GIHYxJBSyKagfUmdXHBAaKN9OAui6Mc5pzZadbtBJRcm/exec";
  if (APPS_SCRIPT_URL) {
    statusEl.textContent = "Backend belum terhubung. Lihat README.md untuk deploy Code.gs.";
    statusEl.className = "form-status err";
    return false;
  }
  btnEl.disabled = true;
  const originalLabel = btnEl.textContent;
  btnEl.textContent = "Mengirim...";
  statusEl.textContent = "";
  statusEl.className = "form-status";
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // hindari CORS preflight — lihat README
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data && data.status === "ok") {
      statusEl.textContent = pesanSukses;
      statusEl.className = "form-status ok";
      return true;
    }
    throw new Error((data && data.message) || "Gagal mengirim data.");
  } catch (err) {
    statusEl.textContent = "Terjadi kendala mengirim data. Coba lagi atau hubungi kami via WhatsApp.";
    statusEl.className = "form-status err";
    return false;
  } finally {
    btnEl.disabled = false;
    btnEl.textContent = originalLabel;
  }
}

function initForms() {
  const formP = document.getElementById("formPendaftaran");
  formP.addEventListener("submit", async e => {
    e.preventDefault();
    const statusEl = document.getElementById("pendaftaranStatus");
    const btnEl = document.getElementById("pendaftaranSubmit");
    const fd = new FormData(formP);
    const fotoFile = fd.get("pasFoto");
    if (fotoFile && fotoFile.size > 1024 * 1024) {
      statusEl.textContent = "Ukuran pas foto melebihi 1 MB.";
      statusEl.className = "form-status err";
      return;
    }
    const fotoBase64 = fotoFile && fotoFile.size ? await fileToBase64(fotoFile) : null;
    const payload = {
      jenis: "pendaftaran",
      waktu: new Date().toISOString(),
      nama: fd.get("nama"), tempatLahir: fd.get("tempatLahir"), tanggalLahir: fd.get("tanggalLahir"),
      jenisKelamin: fd.get("jenisKelamin"), jenjang: fd.get("jenjang"), namaWali: fd.get("namaWali"),
      whatsapp: fd.get("whatsapp"), alamat: fd.get("alamat"), asalSekolah: fd.get("asalSekolah"),
      catatan: fd.get("catatan"),
      fotoBase64: fotoBase64, fotoNama: fotoFile ? fotoFile.name : ""
    };
    const ok = await kirimKeAppsScript(payload, statusEl, btnEl, "Pendaftaran terkirim. Panitia akan menghubungi Anda via WhatsApp.");
    if (ok) formP.reset();
  });

  const formD = document.getElementById("formDonasi");
  formD.addEventListener("submit", async e => {
    e.preventDefault();
    const statusEl = document.getElementById("donasiStatus");
    const btnEl = document.getElementById("donasiSubmit");
    const fd = new FormData(formD);
    const payload = {
      jenis: "donasi",
      waktu: new Date().toISOString(),
      nama: fd.get("nama"), whatsapp: fd.get("whatsapp"), program: fd.get("program"),
      nominal: fd.get("nominal"), metode: fd.get("metode"), catatan: fd.get("catatan")
    };
    const ok = await kirimKeAppsScript(payload, statusEl, btnEl, `Konfirmasi donasi ${formatRupiah(payload.nominal)} diterima. Jazakumullahu khairan.`);
    if (ok) formD.reset();
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderMeta();
  renderStats();
  renderAbout();
  renderFasilitas();
  initGallery();
  initNews();
  renderDonasi();
  initTesti();
  initFaq();
  renderContact();
  initNav();
  initReveal();
  initBackToTop();
  initStatsAnimation();
  initForms();
});