/**
 * admin.js — Logika Panel Admin Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute
 * ------------------------------------------------------------------------------
 * Mengelola:
 * 1. Autentikasi sederhana (client-side, lihat README.md bagian "Kata sandi panel admin")
 * 2. Penarikan data Pendaftaran & Donasi dari Google Sheets (via Code.gs)
 * 3. CMS sederhana untuk Galeri & Berita (disimpan sebagai overlay di localStorage,
 *    dibaca ulang oleh main.js di halaman utama lewat fungsi mergeWithOverlay yang sama)
 *
 * PENTING: samakan URL ini dengan APPS_SCRIPT_URL di js/main.js — keduanya harus
 * menunjuk ke deployment Apps Script yang sama.
 */

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyHZIt_NBOcTBdEuVDE1bwuG8Jfk4hkm0Ibo5a4pBpWy6wGSzOuPVGw-5kI1fm8oaCkfw/exec";

/* ============================================================
   1. Autentikasi Sederhana
   ============================================================ */
const ADMIN_PASSWORD = "adminpesantren123"; // Ganti sebelum upload ke GitHub — lihat README.md

function initAuth() {
  const loginForm = document.getElementById("loginForm");
  const adminDashboard = document.getElementById("adminDashboard");
  const loginError = document.getElementById("loginError");
  const btnLogout = document.getElementById("btnLogout");

  // Cek sesi login di sessionStorage
  if (sessionStorage.getItem("psi_admin_logged_in") === "true") {
    if (loginForm) loginForm.style.display = "none";
    if (adminDashboard) adminDashboard.style.display = "block";
    loadDashboardData();
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pass = document.getElementById("adminPassword").value;
      if (pass === ADMIN_PASSWORD) {
        sessionStorage.setItem("psi_admin_logged_in", "true");
        loginForm.style.display = "none";
        adminDashboard.style.display = "block";
        if (loginError) loginError.style.display = "none";
        loadDashboardData();
      } else {
        if (loginError) {
          loginError.textContent = "Password salah!";
          loginError.style.display = "block";
        }
      }
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      sessionStorage.removeItem("psi_admin_logged_in");
      window.location.reload();
    });
  }
}

/* ============================================================
   2. Fetch Data dari Apps Script (Google Sheets)
   ============================================================ */
async function fetchSheetData(sheetName) {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?action=get&sheet=${encodeURIComponent(sheetName)}`);
    if (!response.ok) throw new Error("Gagal mengambil data dari server.");
    const result = await response.json();
    if (result.status !== "ok") throw new Error(result.message || "Gagal mengambil data.");
    return result.data || [];
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error);
    return null; // null = gagal (beda dari [] = berhasil tapi kosong)
  }
}

async function loadDashboardData() {
  const statusEl = document.getElementById("dashboardStatus");
  if (statusEl) statusEl.textContent = "Memuat data dari server...";

  const [dataPendaftaran, dataDonasi] = await Promise.all([
    fetchSheetData("Pendaftaran"),
    fetchSheetData("Donasi")
  ]);

  if (statusEl) {
    statusEl.textContent = (dataPendaftaran === null || dataDonasi === null)
      ? "Gagal terhubung ke Google Sheets. Cek APPS_SCRIPT_URL di admin.js & main.js."
      : "";
  }

  renderTablePendaftaran(dataPendaftaran || []);
  renderTableDonasi(dataDonasi || []);

  // Render Data Lokal (CMS)
  renderTableCMS("berita");
  renderTableCMS("galeri");
}

/* ============================================================
   3. Render Tabel Data Server (Read-Only)
   Data yang masuk berbentuk array of object dengan key = nama kolom
   header di Google Sheets (lihat PENDAFTARAN_HEADERS / DONASI_HEADERS
   di Code.gs), jadi tidak bergantung pada urutan kolom.
   ============================================================ */
function renderTablePendaftaran(data) {
  const tbody = document.querySelector("#tablePendaftaran tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center">Belum ada data pendaftaran.</td></tr>`;
    return;
  }

  data.forEach(row => {
    const waktu = row["Waktu"];
    const wa = row["No. WhatsApp"] || "";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${waktu ? new Date(waktu).toLocaleDateString("id-ID") : "-"}</td>
      <td><strong>${row["Nama Santri"] || "-"}</strong></td>
      <td>${row["Jenjang"] || "-"}</td>
      <td>${row["Jenis Kelamin"] || "-"}</td>
      <td><a href="https://wa.me/${normalisasiWa(wa)}" target="_blank">${wa || "-"}</a></td>
      <td>${row["Asal Sekolah"] || "-"}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderTableDonasi(data) {
  const tbody = document.querySelector("#tableDonasi tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center">Belum ada data donasi.</td></tr>`;
    return;
  }

  data.forEach(row => {
    const waktu = row["Waktu"];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${waktu ? new Date(waktu).toLocaleDateString("id-ID") : "-"}</td>
      <td><strong>${row["Nama Donatur"] || "-"}</strong></td>
      <td>${row["No. WhatsApp"] || "-"}</td>
      <td>${row["Program"] || "-"}</td>
      <td>Rp ${Number(row["Nominal"] || 0).toLocaleString("id-ID")}</td>
      <td>${row["Metode"] || "-"}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Bersihkan nomor WhatsApp jadi format internasional (62...) untuk link wa.me
function normalisasiWa(nomor) {
  let n = String(nomor || "").replace(/[^0-9]/g, "");
  if (n.startsWith("0")) n = "62" + n.slice(1);
  return n;
}

/* ============================================================
   4. CMS Lokal Sederhana (Berita & Galeri via LocalStorage)
   Format overlay harus sama persis dengan yang dibaca main.js
   (fungsi mergeWithOverlay), supaya perubahan di sini konsisten
   dengan yang tampil di halaman utama.
   ============================================================ */
function getBaseData(jenis) {
  if (jenis === "berita" && typeof SITE_DATA !== "undefined") return SITE_DATA.berita;
  if (jenis === "galeri" && typeof SITE_DATA !== "undefined") return SITE_DATA.galeri;
  return [];
}

function mergeDataCMS(jenis) {
  const baseArray = getBaseData(jenis);
  let overlay = {};
  let deleted = [];
  try { overlay = JSON.parse(localStorage.getItem(`psi_overlay_${jenis}`) || "{}"); } catch (e) {}
  try { deleted = JSON.parse(localStorage.getItem(`psi_deleted_${jenis}`) || "[]"); } catch (e) {}

  const map = new Map();
  baseArray.forEach(item => map.set(item.id, item));
  Object.values(overlay).forEach(item => map.set(item.id, item));
  deleted.forEach(id => map.delete(id));

  return Array.from(map.values()).sort((a, b) => {
    if (a.tanggal && b.tanggal) return new Date(b.tanggal) - new Date(a.tanggal);
    return 0;
  });
}

function deleteItem(jenis, id) {
  if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;

  let deleted = [];
  try { deleted = JSON.parse(localStorage.getItem(`psi_deleted_${jenis}`) || "[]"); } catch (e) {}
  if (!deleted.includes(id)) deleted.push(id);
  localStorage.setItem(`psi_deleted_${jenis}`, JSON.stringify(deleted));

  let overlay = {};
  try { overlay = JSON.parse(localStorage.getItem(`psi_overlay_${jenis}`) || "{}"); } catch (e) {}
  if (overlay[id]) {
    delete overlay[id];
    localStorage.setItem(`psi_overlay_${jenis}`, JSON.stringify(overlay));
  }

  renderTableCMS(jenis);
  showToast("Data dihapus. Perubahan akan terlihat di halaman utama pengunjung (browser ini).");
}

function saveOverlayCMS(jenis, itemObj) {
  let overlay = {};
  try { overlay = JSON.parse(localStorage.getItem(`psi_overlay_${jenis}`) || "{}"); } catch (e) {}

  overlay[itemObj.id] = itemObj;
  localStorage.setItem(`psi_overlay_${jenis}`, JSON.stringify(overlay));

  renderTableCMS(jenis);
  showToast("Data berhasil disimpan!");
}

function renderTableCMS(jenis) {
  const tbody = document.querySelector(`#tableCMS${jenis.charAt(0).toUpperCase() + jenis.slice(1)} tbody`);
  if (!tbody) return;

  const items = mergeDataCMS(jenis);
  tbody.innerHTML = "";

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center">Tidak ada data.</td></tr>`;
    return;
  }

  items.forEach(item => {
    const tr = document.createElement("tr");
    const judul = item.judul || "Tanpa Judul";

    tr.innerHTML = `
      <td>${item.id}</td>
      <td><strong>${judul}</strong></td>
      <td>${item.kategori || "-"}</td>
      <td>
        <button type="button" class="btn btn-outline btn-sm btn-delete" data-jenis="${jenis}" data-id="${item.id}">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Delegasi event tombol hapus (menghindari inline onclick + masalah escaping id)
  tbody.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", () => deleteItem(btn.dataset.jenis, btn.dataset.id));
  });
}

/* ============================================================
   5. Form Handler untuk Tambah Data CMS
   ============================================================ */
function initCMSForms() {
  const formBerita = document.getElementById("formTambahBerita");
  if (formBerita) {
    formBerita.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = "b_" + Date.now();
      const newItem = {
        id: id,
        kategori: document.getElementById("b_kategori").value,
        tanggal: new Date().toISOString().split("T")[0],
        judul: document.getElementById("b_judul").value,
        ringkasan: document.getElementById("b_ringkasan").value,
        isi: document.getElementById("b_isi").value
      };
      saveOverlayCMS("berita", newItem);
      formBerita.reset();
    });
  }

  const formGaleri = document.getElementById("formTambahGaleri");
  if (formGaleri) {
    formGaleri.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = "g_" + Date.now();
      const newItem = {
        id: id,
        kategori: document.getElementById("g_kategori").value,
        judul: document.getElementById("g_judul").value,
        img: document.getElementById("g_img_url").value
      };
      saveOverlayCMS("galeri", newItem);
      formGaleri.reset();
    });
  }
}

/* ============================================================
   6. Navigasi Tab Dashboard
   ============================================================ */
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.getAttribute("data-target");
      const target = document.getElementById(targetId);
      if (target) target.classList.add("active");
    });
  });
}

/* ============================================================
   7. Toast Notifikasi
   ============================================================ */
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) { alert(message); return; }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  initTabs();
  initCMSForms();
});
