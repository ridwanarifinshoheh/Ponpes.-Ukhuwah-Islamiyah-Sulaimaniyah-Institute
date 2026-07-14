/**
 * admin.js — Logika Panel Admin Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute
 * ------------------------------------------------------------------------------
 * Mengatur Autentikasi, CRUD (Galeri & Berita) via Local Storage Overlay,
 * dan Sinkronisasi (Baca/Tulis) ke Google Sheets via Apps Script.
 */

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyHZIt_NBOcTBdEuVDE1bwuG8Jfk4hkm0Ibo5a4pBpWy6wGSzOuPVGw-5kI1fm8oaCkfw/exec";

/* ============================================================
   1. State & Utility Helper
   ============================================================ */
let activeTab = "dashboard";
let pendaftaranData = [];
let donasiData = [];

// Format penanggalan dan mata uang
function formatTanggal(iso) {
  if (!iso) return "-";
  try { return new Date(iso).toLocaleDateString('id-ID', { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute:"2-digit" }); }
  catch (e) { return iso; }
}
function formatRupiah(n) {
  return "Rp" + Number(n || 0).toLocaleString("id-ID");
}

// Menampilkan Notifikasi (Toast)
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `admin-toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Asumsi ada CSS animasi masuk. Hapus setelah 3 detik.
  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Helper untuk membaca file gambar menjadi Base64 string
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ============================================================
   2. Autentikasi (Sederhana via sessionStorage)
   ============================================================ */
const ADMIN_PIN = "123456"; // PIN bawaan panel Admin

function checkAuth() {
  const isLoggedIn = sessionStorage.getItem("psi_admin_logged_in");
  const loginScreen = document.getElementById("loginScreen");
  const adminPanel = document.getElementById("adminPanel");

  if (isLoggedIn === "true") {
    if(loginScreen) loginScreen.style.display = "none";
    if(adminPanel) adminPanel.style.display = "block";
    renderAllTables();
  } else {
    if(loginScreen) loginScreen.style.display = "flex";
    if(adminPanel) adminPanel.style.display = "none";
  }
}

function initAuth() {
  const loginBtn = document.getElementById("btnLogin");
  const logoutBtn = document.getElementById("btnLogout");
  const pinInput = document.getElementById("adminPin");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      if (pinInput.value === ADMIN_PIN) {
        sessionStorage.setItem("psi_admin_logged_in", "true");
        showToast("Login berhasil!", "success");
        checkAuth();
      } else {
        showToast("PIN Salah!", "error");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("psi_admin_logged_in");
      showToast("Anda telah keluar.", "success");
      checkAuth();
    });
  }
}

/* ============================================================
   3. Manajemen Data Lokal (Overlay) selaras dengan main.js
   ============================================================ */
function getOverlay(jenis) {
  try { return JSON.parse(localStorage.getItem(`psi_overlay_${jenis}`) || "{}"); } catch (e) { return {}; }
}
function setOverlay(jenis, data) {
  localStorage.setItem(`psi_overlay_${jenis}`, JSON.stringify(data));
}
function getDeleted(jenis) {
  try { return JSON.parse(localStorage.getItem(`psi_deleted_${jenis}`) || "[]"); } catch (e) { return []; }
}
function setDeleted(jenis, data) {
  localStorage.setItem(`psi_deleted_${jenis}`, JSON.stringify(data));
}

// Menyatukan SITE_DATA.js bawaan dengan data yang belum di-sync
function getMergedData(baseArray, jenis) {
  const overlay = getOverlay(jenis);
  const deleted = getDeleted(jenis);
  const map = new Map();

  if(baseArray) baseArray.forEach(item => map.set(item.id, item));
  Object.values(overlay).forEach(item => map.set(item.id, item));
  deleted.forEach(id => map.delete(id));

  return Array.from(map.values()).sort((a, b) => new Date(b.tanggal || 0) - new Date(a.tanggal || 0));
}

function deleteItem(jenis, id) {
  if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;

  const overlay = getOverlay(jenis);
  if (overlay[id]) {
    delete overlay[id];
    setOverlay(jenis, overlay);
  } else {
    const deleted = getDeleted(jenis);
    if (!deleted.includes(id)) {
      deleted.push(id);
      setDeleted(jenis, deleted);
    }
  }
  renderAllTables();
  showToast("Data dihapus (menunggu sinkronisasi).");
}

/* ============================================================
   4. Render Tabel Konten (Galeri & Berita)
   ============================================================ */
function renderTableGaleri() {
  const tbody = document.getElementById("tbodyGaleri");
  if (!tbody || !window.SITE_DATA) return;
  tbody.innerHTML = "";

  const data = getMergedData(SITE_DATA.galeri, "galeri");
  data.forEach((item, index) => {Berikut adalah keseluruhan kode **`admin.js`** yang telah disesuaikan agar tersinkronisasi dengan **`main.js`** dan backend **`Code.gs`** (Google Apps Script) menggunakan URL yang sama.

Kode ini mencakup fungsi untuk menarik data (Pendaftaran & Donasi) dari Google Sheets, serta sistem CMS *Client-Side* (menyimpan data modifikasi Berita & Galeri ke `localStorage`) yang formatnya langsung terbaca oleh fungsi `mergeWithOverlay` di halaman utama.

### Kode Lengkap `admin.js`

```javascript
/**
 * admin.js — Logika halaman Panel Admin Pesantren Ukhuwah Islamiyah
 * ------------------------------------------------------------------------------
 * Mengelola penarikan data dari Google Sheets (melalui Apps Script)
 * dan sistem CMS sederhana (Berita & Galeri) menggunakan LocalStorage.
 */

const APPS_SCRIPT_URL = "[https://script.google.com/macros/s/AKfycbyHZIt_NBOcTBdEuVDE1bwuG8Jfk4hkm0Ibo5a4pBpWy6wGSzOuPVGw-5kI1fm8oaCkfw/exec](https://script.google.com/macros/s/AKfycbyHZIt_NBOcTBdEuVDE1bwuG8Jfk4hkm0Ibo5a4pBpWy6wGSzOuPVGw-5kI1fm8oaCkfw/exec)";

/* ============================================================
   1. Autentikasi Sederhana
   ============================================================ */
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
      // Gunakan password sederhana (bisa disesuaikan/diubah nanti)
      if (pass === "adminpesantren123") {
        sessionStorage.setItem("psi_admin_logged_in", "true");
        loginForm.style.display = "none";
        adminDashboard.style.display = "block";
        loadDashboardData();
      } else {
        loginError.textContent = "Password salah!";
        loginError.style.display = "block";
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
    // Memanggil endpoint Apps Script dengan parameter GET
    const response = await fetch(`${APPS_SCRIPT_URL}?action=get&sheet=${sheetName}`);
    if (!response.ok) throw new Error("Gagal mengambil data dari server.");
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error);
    return [];
  }
}

async function loadDashboardData() {
  const statusEl = document.getElementById("dashboardStatus");
  if (statusEl) statusEl.textContent = "Memuat data dari server...";

  // Ambil data Pendaftaran dan Donasi secara paralel
  const [dataPendaftaran, dataDonasi] = await Promise.all([
    fetchSheetData("Pendaftaran"),
    fetchSheetData("Donasi")
  ]);

  if (statusEl) statusEl.textContent = "";

  renderTablePendaftaran(dataPendaftaran);
  renderTableDonasi(dataDonasi);

  // Render Data Lokal (CMS)
  renderTableCMS("berita");
  renderTableCMS("galeri");
}

/* ============================================================
   3. Render Tabel Data Server (Read-Only)
   ============================================================ */
function renderTablePendaftaran(data) {
  const tbody = document.querySelector("#tablePendaftaran tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center">Belum ada data pendaftaran.</td></tr>`;
    return;
  }

  // Asumsi urutan kolom dari backend: Waktu, Nama, Jenjang, L/P, WhatsApp, Asal Sekolah, Status
  data.forEach((row, index) => {
    // Lewati baris header jika ikut terbawa
    if (index === 0 && row[0].toString().toLowerCase() === "waktu") return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${new Date(row[0]).toLocaleDateString("id-ID")}</td>
      <td><strong>${row[1] || "-"}</strong></td>
      <td>${row[4] || "-"}</td>
      <td>${row[3] || "-"}</td>
      <td><a href="[https://wa.me/$](https://wa.me/$){row[6]}" target="_blank">${row[6] || "-"}</a></td>
      <td>${row[8] || "-"}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderTableDonasi(data) {
  const tbody = document.querySelector("#tableDonasi tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center">Belum ada data donasi.</td></tr>`;
    return;
  }

  // Asumsi urutan kolom dari backend: Waktu, Nama, WhatsApp, Program, Nominal, Metode, Catatan
  data.forEach((row, index) => {
    if (index === 0 && row[0].toString().toLowerCase() === "waktu") return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${new Date(row[0]).toLocaleDateString("id-ID")}</td>
      <td><strong>${row[1] || "-"}</strong></td>
      <td>${row[2] || "-"}</td>
      <td>${row[3] || "-"}</td>
      <td>Rp ${Number(row[4] || 0).toLocaleString("id-ID")}</td>
      <td>${row[5] || "-"}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ============================================================
   4. CMS Lokal Sederhana (Berita & Galeri via LocalStorage)
   ============================================================ */
function getBaseData(jenis) {
  // Mengambil data bawaan dari data.js (SITE_DATA)
  if (jenis === "berita" && typeof SITE_DATA !== "undefined") return SITE_DATA.berita;
  if (jenis === "galeri" && typeof SITE_DATA !== "undefined") return SITE_DATA.galeri;
  return [];
}

function mergeDataCMS(jenis) {
  let baseArray = getBaseData(jenis);
  let overlay = {};
  let deleted = [];
  try { overlay = JSON.parse(localStorage.getItem(`psi_overlay_${jenis}`) || "{}"); } catch (e) {}
  try { deleted = JSON.parse(localStorage.getItem(`psi_deleted_${jenis}`) || "[]"); } catch (e) {}

  const map = new Map();
  baseArray.forEach(item => map.set(item.id, item));
  Object.values(overlay).forEach(item => map.set(item.id, item));
  deleted.forEach(id => map.delete(id));

  return Array.from(map.values()).sort((a, b) => {
    if(a.tanggal && b.tanggal) return new Date(b.tanggal) - new Date(a.tanggal);
    return 0;
  });
}

function deleteItem(jenis, id) {
  if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;

  // Tambahkan ke daftar deleted
  let deleted = [];
  try { deleted = JSON.parse(localStorage.getItem(`psi_deleted_${jenis}`) || "[]"); } catch (e) {}
  if (!deleted.includes(id)) deleted.push(id);
  localStorage.setItem(`psi_deleted_${jenis}`, JSON.stringify(deleted));

  // Hapus dari overlay jika ada
  let overlay = {};
  try { overlay = JSON.parse(localStorage.getItem(`psi_overlay_${jenis}`) || "{}"); } catch (e) {}
  if (overlay[id]) {
    delete overlay[id];
    localStorage.setItem(`psi_overlay_${jenis}`, JSON.stringify(overlay));
  }

  renderTableCMS(jenis);
  alert("Data berhasil dihapus. Perubahan akan terlihat di halaman utama pengunjung.");
}

function saveOverlayCMS(jenis, itemObj) {
  let overlay = {};
  try { overlay = JSON.parse(localStorage.getItem(`psi_overlay_${jenis}`) || "{}"); } catch (e) {}

  overlay[itemObj.id] = itemObj;
  localStorage.setItem(`psi_overlay_${jenis}`, JSON.stringify(overlay));

  renderTableCMS(jenis);
  alert("Data berhasil disimpan!");
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
    const judul = item.judul || item.judul_id || "Tanpa Judul";
    const infoTambahan = jenis === "berita" ? item.kategori : item.kategori;

    tr.innerHTML = `
      <td>${item.id}</td>
      <td><strong>${judul}</strong></td>
      <td>${infoTambahan}</td>
      <td>
        <button class="btn-delete" onclick="deleteItem('${jenis}', '${item.id}')">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
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
        img: document.getElementById("g_img_url").value // Menggunakan URL eksternal untuk efisiensi localstorage
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
      // Hapus state aktif
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      // Set state aktif pada yang di-klik
      btn.classList.add("active");
      const targetId = btn.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  initTabs();
  initCMSForms();
});