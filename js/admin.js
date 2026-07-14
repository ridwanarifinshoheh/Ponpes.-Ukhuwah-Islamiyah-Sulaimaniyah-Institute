/**
 * admin.js — Panel admin Sulaimaniyah Institute
 * ------------------------------------------------------------------------
 * CATATAN KEAMANAN: kata sandi di bawah ini hanya pemeriksaan sisi-klien
 * (client-side) untuk mencegah orang iseng, BUKAN sistem keamanan sungguhan.
 * Siapa pun yang membuka source code file ini bisa melihatnya. Jangan
 * gunakan panel ini untuk menyimpan data yang benar-benar rahasia.
 * Ganti nilai di bawah dengan kata sandimu sendiri sebelum di-push ke GitHub.
 */
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxG12wdncK7D5MY8zZkXY2BHVXQ3lYC57m7Rv4l1hUR/dev";
/* ============================================================
   Storage overlay — kontrak SAMA PERSIS dengan js/main.js
   ============================================================ */
function getOverlay(jenis) {
  try { return JSON.parse(localStorage.getItem(`psi_overlay_${jenis}`) || "{}"); } catch (e) { return {}; }
}
function setOverlay(jenis, obj) { localStorage.setItem(`psi_overlay_${jenis}`, JSON.stringify(obj)); }
function getDeleted(jenis) {
  try { return JSON.parse(localStorage.getItem(`psi_deleted_${jenis}`) || "[]"); } catch (e) { return []; }
}
function setDeleted(jenis, arr) { localStorage.setItem(`psi_deleted_${jenis}`, JSON.stringify(arr)); }

function mergedList(baseArray, jenis) {
  const overlay = getOverlay(jenis);
  const deleted = getDeleted(jenis);
  const map = new Map();
  baseArray.forEach(item => map.set(item.id, item));
  Object.values(overlay).forEach(item => map.set(item.id, item));
  deleted.forEach(id => map.delete(id));
  return Array.from(map.values());
}
function isBaseId(baseArray, id) { return baseArray.some(i => i.id === id); }

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}
function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function newId(prefix) { return prefix + Date.now().toString(36); }
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

/* ============================================================
   Login gate
   ============================================================ */
function initLogin() {
  const loginScreen = document.getElementById("loginScreen");
  const adminScreen = document.getElementById("adminScreen");

  if (sessionStorage.getItem("psi_admin_authed") === "1") {
    loginScreen.hidden = true;
    adminScreen.hidden = false;
    boot();
  }

  document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const val = document.getElementById("loginPass").value;
    if (val === ADMIN_PASSWORD) {
      sessionStorage.setItem("psi_admin_authed", "1");
      loginScreen.hidden = true;
      adminScreen.hidden = false;
      boot();
    } else {
      document.getElementById("loginError").textContent = "Kata sandi salah. Coba lagi.";
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("psi_admin_authed");
    location.reload();
  });
}

/* ============================================================
   Tabs
   ============================================================ */
function initTabs() {
  document.querySelectorAll(".admin-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".admin-panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("panel-" + tab.dataset.tab).classList.add("active");
    });
  });
}

/* ============================================================
   GALERI CRUD
   ============================================================ */
function renderGaleriList() {
  const wrap = document.getElementById("listGaleri");
  wrap.innerHTML = "";
  const items = mergedList(SITE_DATA.galeri, "galeri");
  items.forEach(item => {
    const overlay = getOverlay("galeri");
    const label = isBaseId(SITE_DATA.galeri, item.id)
      ? (overlay[item.id] ? "Bawaan (diedit)" : "Bawaan dari data.js")
      : "Tambahan admin";
    const row = el(`
      <div class="admin-row">
        ${item.img ? `<img src="${item.img}" alt="">` : `<div style="width:56px;height:56px;border-radius:8px;background:var(--emerald-soft);display:flex;align-items:center;justify-content:center;color:var(--emerald)"><i class="fa-solid fa-image"></i></div>`}
        <div class="meta">
          <strong>${item.judul}</strong>
          <span>${item.kategori} · ${label}</span>
        </div>
        <div class="row-actions">
          <button class="icon-btn" data-edit="${item.id}" aria-label="Edit"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-btn danger" data-del="${item.id}" aria-label="Hapus"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`);
    wrap.appendChild(row);
  });

  wrap.querySelectorAll("[data-edit]").forEach(b => b.addEventListener("click", () => editGaleri(b.dataset.edit)));
  wrap.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => deleteItem("galeri", b.dataset.del, renderGaleriList)));
}
function editGaleri(id) {
  const item = mergedList(SITE_DATA.galeri, "galeri").find(i => i.id === id);
  if (!item) return;
  document.getElementById("g_id").value = item.id;
  document.getElementById("g_judul").value = item.judul;
  document.getElementById("g_kategori").value = item.kategori;
  document.getElementById("g_img").value = item.img || "";
  document.getElementById("g_submit").textContent = "Simpan Perubahan";
  document.getElementById("g_cancel").hidden = false;
  window.scrollTo({ top: document.getElementById("formGaleri").offsetTop - 20, behavior: "smooth" });
}
function resetGaleriForm() {
  document.getElementById("formGaleri").reset();
  document.getElementById("g_id").value = "";
  document.getElementById("g_submit").textContent = "Tambah Foto";
  document.getElementById("g_cancel").hidden = true;
}
function initGaleriForm() {
  document.getElementById("g_file").addEventListener("change", async e => {
    const file = e.target.files[0];
    if (file) document.getElementById("g_img").value = await fileToBase64(file);
  });
  document.getElementById("g_cancel").addEventListener("click", resetGaleriForm);
  document.getElementById("formGaleri").addEventListener("submit", e => {
    e.preventDefault();
    const idField = document.getElementById("g_id").value;
    const id = idField || newId("g");
    const item = {
      id,
      judul: document.getElementById("g_judul").value.trim(),
      kategori: document.getElementById("g_kategori").value,
      img: document.getElementById("g_img").value.trim()
    };
    const overlay = getOverlay("galeri");
    overlay[id] = item;
    setOverlay("galeri", overlay);
    resetGaleriForm();
    renderGaleriList();
    toast(idField ? "Foto diperbarui." : "Foto ditambahkan.");
  });
}

/* ============================================================
   BERITA CRUD
   ============================================================ */
function renderBeritaList() {
  const wrap = document.getElementById("listBerita");
  wrap.innerHTML = "";
  const items = mergedList(SITE_DATA.berita, "berita").sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  items.forEach(item => {
    const overlay = getOverlay("berita");
    const label = isBaseId(SITE_DATA.berita, item.id)
      ? (overlay[item.id] ? "Bawaan (diedit)" : "Bawaan dari data.js")
      : "Tambahan admin";
    const row = el(`
      <div class="admin-row">
        <div style="width:56px;height:56px;border-radius:8px;background:var(--emerald-soft);display:flex;align-items:center;justify-content:center;color:var(--emerald);flex:none"><i class="fa-solid fa-newspaper"></i></div>
        <div class="meta">
          <strong>${item.judul}</strong>
          <span>${item.kategori} · ${item.tanggal} · ${label}</span>
        </div>
        <div class="row-actions">
          <button class="icon-btn" data-edit="${item.id}" aria-label="Edit"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-btn danger" data-del="${item.id}" aria-label="Hapus"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`);
    wrap.appendChild(row);
  });

  wrap.querySelectorAll("[data-edit]").forEach(b => b.addEventListener("click", () => editBerita(b.dataset.edit)));
  wrap.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => deleteItem("berita", b.dataset.del, renderBeritaList)));
}
function editBerita(id) {
  const item = mergedList(SITE_DATA.berita, "berita").find(i => i.id === id);
  if (!item) return;
  document.getElementById("b_id").value = item.id;
  document.getElementById("b_judul").value = item.judul;
  document.getElementById("b_kategori").value = item.kategori;
  document.getElementById("b_tanggal").value = item.tanggal;
  document.getElementById("b_ringkasan").value = item.ringkasan;
  document.getElementById("b_isi").value = item.isi;
  document.getElementById("b_submit").textContent = "Simpan Perubahan";
  document.getElementById("b_cancel").hidden = false;
  window.scrollTo({ top: document.getElementById("formBerita").offsetTop - 20, behavior: "smooth" });
}
function resetBeritaForm() {
  document.getElementById("formBerita").reset();
  document.getElementById("b_id").value = "";
  document.getElementById("b_submit").textContent = "Tambah Berita";
  document.getElementById("b_cancel").hidden = true;
}
function initBeritaForm() {
  document.getElementById("b_cancel").addEventListener("click", resetBeritaForm);
  document.getElementById("formBerita").addEventListener("submit", e => {
    e.preventDefault();
    const idField = document.getElementById("b_id").value;
    const id = idField || newId("b");
    const item = {
      id,
      judul: document.getElementById("b_judul").value.trim(),
      kategori: document.getElementById("b_kategori").value,
      tanggal: document.getElementById("b_tanggal").value,
      ringkasan: document.getElementById("b_ringkasan").value.trim(),
      isi: document.getElementById("b_isi").value.trim()
    };
    const overlay = getOverlay("berita");
    overlay[id] = item;
    setOverlay("berita", overlay);
    resetBeritaForm();
    renderBeritaList();
    toast(idField ? "Berita diperbarui." : "Berita ditambahkan.");
  });
}

/* ============================================================
   Delete (dipakai bersama Galeri & Berita)
   ============================================================ */
function deleteItem(jenis, id, rerender) {
  if (!confirm("Hapus item ini? Tindakan ini hanya memengaruhi tampilan di browser ini.")) return;
  const overlay = getOverlay(jenis);
  delete overlay[id];
  setOverlay(jenis, overlay);
  const deleted = getDeleted(jenis);
  if (!deleted.includes(id)) deleted.push(id);
  setDeleted(jenis, deleted);
  rerender();
  toast("Item dihapus.");
}

/* ============================================================
   Export / Import / Reset
   ============================================================ */
function initBackup() {
  document.getElementById("exportBtn").addEventListener("click", () => {
    const payload = {
      galeri: mergedList(SITE_DATA.galeri, "galeri"),
      berita: mergedList(SITE_DATA.berita, "berita"),
      diekspor: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `sulaimaniyah-konten-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    toast("File JSON diunduh.");
  });

  document.getElementById("importFile").addEventListener("change", async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (Array.isArray(data.galeri)) {
        const overlay = {};
        data.galeri.forEach(i => (overlay[i.id] = i));
        setOverlay("galeri", overlay);
      }
      if (Array.isArray(data.berita)) {
        const overlay = {};
        data.berita.forEach(i => (overlay[i.id] = i));
        setOverlay("berita", overlay);
      }
      renderGaleriList();
      renderBeritaList();
      toast("Data berhasil diimpor.");
    } catch (err) {
      toast("Gagal membaca file JSON.");
    }
    e.target.value = "";
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    if (!confirm("Hapus SEMUA perubahan lokal (galeri & berita) di browser ini? Konten bawaan dari data.js tidak terpengaruh.")) return;
    ["psi_overlay_galeri", "psi_deleted_galeri", "psi_overlay_berita", "psi_deleted_berita"].forEach(k => localStorage.removeItem(k));
    renderGaleriList();
    renderBeritaList();
    toast("Semua perubahan lokal dihapus.");
  });
}

/* ============================================================
   BOOT
   ============================================================ */
function boot() {
  initTabs();
  initGaleriForm();
  initBeritaForm();
  initBackup();
  renderGaleriList();
  renderBeritaList();
}

document.addEventListener("DOMContentLoaded", initLogin);