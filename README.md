# Website Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute

Website profil pesantren: Beranda, Tentang, Fasilitas, Galeri, Informasi/Berita,
Pendaftaran, Donasi, Testimoni, FAQ, Kontak — plus panel admin sederhana.

## Struktur folder

```
pesantren-website/
├── index.html          ← halaman utama (upload ke GitHub + Render)
├── admin.html           ← panel admin (upload ke GitHub + Render juga)
├── Code.gs               ← TIDAK diupload ke GitHub — tempel ke Apps Script Google
├── css/style.css
├── js/
│   ├── data.js           ← isi konten (edit di PyCharm untuk update permanen)
│   ├── main.js            ← logika halaman utama + koneksi ke Code.gs
│   └── admin.js            ← logika panel admin
├── assets/images/
│   └── favicon.svg
└── README.md              ← file ini
```

## Arsitektur singkat

```
Pengunjung Web  →  index.html (GitHub/Render)
                       │
                       │  fetch() saat submit form Pendaftaran / Donasi
                       ▼
              Code.gs (Web App di Apps Script)
                       │
                       ▼
              Google Sheets milikmu sendiri
              (bisa dibuka & diunduh ke komputer kapan saja)
```

Konten **Galeri** dan **Berita** sumber utamanya adalah `js/data.js` (kamu edit
manual, tampil sama untuk semua orang). Panel admin (`admin.html`) menambahkan
lapisan perubahan cepat yang tersimpan di **localStorage browser admin** —
lihat bagian "Alur kerja konten" di bawah untuk detailnya.

---

## 1. Menghubungkan Code.gs (backend)

1. Buka [sheets.google.com](https://sheets.google.com), buat **Spreadsheet baru** (kosong),
   beri nama misalnya "Data Pesantren Sulaimaniyah".
2. Di menu Sheet, klik **Extensions → Apps Script**.
3. Hapus kode default (`function myFunction(){}`), lalu **tempel seluruh isi
   file `Code.gs`** dari folder project ini.
4. Klik **Save** (ikon disket), beri nama project misalnya "Backend Pesantren".
5. Klik **Deploy → New deployment**.
   - Klik ikon gerigi di samping "Select type" → pilih **Web app**.
   - Description: bebas, misalnya "v1".
   - **Execute as: Me (akunmu)**.
   - **Who has access: Anyone**.
   - Klik **Deploy**. Google akan meminta izin akses — klik **Authorize access**,
     pilih akunmu, lalu **Advanced → Buka (nama project) (tidak aman)** →
     **Allow**. Ini normal karena scriptnya belum diverifikasi Google (punyamu sendiri, aman).
6. Salin **Web app URL** yang muncul (formatnya
   `https://script.google.com/macros/s/xxxxxxxxxxxxx/exec`).
7. Buka `js/main.js`, cari baris paling atas:
   ```js
   const APPS_SCRIPT_URL = "PASTE_URL_WEB_APP_APPS_SCRIPT_DI_SINI";
   ```
   Ganti dengan URL yang kamu salin tadi.

Sheet **"Pendaftaran"** dan **"Donasi"** akan otomatis dibuat di spreadsheet
kamu begitu ada formulir yang masuk pertama kali — tidak perlu dibuat manual.

### Setiap kali kamu mengubah isi Code.gs
Perubahan pada Apps Script **tidak otomatis live**. Kamu perlu:
**Deploy → Manage deployments → ikon pensil pada deployment aktif → New
version → Deploy**, supaya URL yang sama memakai kode terbaru.

### Kenapa pakai `text/plain` di fetch, bukan `application/json`?
Apps Script Web App tidak menangani permintaan **preflight OPTIONS** yang
otomatis dikirim browser untuk `Content-Type: application/json`. Mengirim
sebagai `text/plain` menghindari preflight itu, sehingga tidak muncul error
CORS. Di sisi Code.gs, isinya tetap kita baca dan `JSON.parse()` seperti biasa
lewat `e.postData.contents`. Ini trik standar untuk Apps Script + fetch dari
domain luar — sudah diterapkan di `js/main.js`, tidak perlu diubah.

---

## 2. Menjalankan & menguji di komputer (PyCharm)

Karena semuanya file statis (HTML/CSS/JS), kamu tidak perlu server khusus:
- Klik kanan `index.html` di PyCharm → **Open in Browser**, atau
- Jalankan server lokal sederhana dari terminal PyCharm:
  ```bash
  python -m http.server 5500
  ```
  lalu buka `http://localhost:5500` di browser.

Uji coba formulir Pendaftaran/Donasi sebelum upload — pastikan datanya
benar-benar masuk ke Google Sheet kamu.

---

## 3. Upload ke GitHub

```bash
cd pesantren-website
git init
git add index.html admin.html css js assets README.md .gitignore
git commit -m "Website profil Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute"
git branch -M main
git remote add origin https://github.com/<username>/<nama-repo>.git
git push -u origin main
```

**PENTING:** jangan pernah menambahkan `Code.gs` ke `git add` — file itu
sudah cukup hidup di Apps Script Google saja. Sebuah `.gitignore` sudah
disiapkan di folder ini untuk membantu mencegah itu.

---

## 4. Deploy ke Render

1. Login ke [render.com](https://render.com), klik **New → Static Site**.
2. Hubungkan repo GitHub yang baru kamu push.
3. **Build Command**: kosongkan (tidak perlu build, ini situs statis).
4. **Publish Directory**: `.` (folder utama repo, karena `index.html` ada di root).
5. Klik **Create Static Site** — Render akan memberimu URL publik
   (`https://nama-kamu.onrender.com`).

Alternatif gratis lain: **GitHub Pages** (Settings → Pages → Deploy from
branch `main` / folder root) — juga bisa dipakai bersamaan dengan Render.

---

## 5. Alur kerja konten (Galeri & Berita)

Kamu memilih pendekatan **gabungan**, jadi begini cara pakainya:

1. **Isi awal & update besar** → edit langsung `js/data.js` di PyCharm
   (tambah/ubah/hapus objek di array `galeri` atau `berita`), lalu
   `git add`, `commit`, `push`. Ini yang tampil untuk **semua pengunjung**.
2. **Update cepat sehari-hari** → buka `admin.html` di website yang sudah
   live, login, tambah/edit foto atau berita lewat form. Perubahan ini
   **hanya tersimpan di browser tempat kamu login** (localStorage) — belum
   terlihat pengunjung lain.
3. Supaya perubahan cepat itu jadi **permanen untuk semua orang**: buka tab
   **Data & Backup** di panel admin → klik **Export JSON** → buka file JSON
   yang terunduh → salin data yang relevan ke `js/data.js` → push ke GitHub.

Foto: field **URL Gambar** sebaiknya diisi tautan ke foto yang sudah kamu
unggah (misalnya ke folder `assets/images/` di repo, atau layanan hosting
gambar). Opsi "unggah file" di panel admin menyimpan foto sebagai base64 di
localStorage — praktis untuk pratinjau cepat, tapi **jangan dipakai untuk
banyak foto** karena localStorage browser dibatasi sekitar 5 MB.

---

## 6. Kata sandi panel admin

Kata sandi disetel di `js/admin.js`:
```js
const ADMIN_PASSWORD = "ukhuwah2026";
```
**Ganti ini sebelum upload ke GitHub.** Perlu diketahui: ini hanya
pemeriksaan sisi-klien (client-side) untuk mencegah orang iseng membuka
panel admin — bukan sistem keamanan yang kuat, karena siapa pun yang melihat
source code `admin.js` bisa membaca kata sandinya. Jangan gunakan panel ini
untuk data yang benar-benar sensitif. `admin.html` juga sudah diberi tag
`<meta name="robots" content="noindex, nofollow">` supaya tidak muncul di
hasil pencarian Google.

---

## 7. Kustomisasi cepat

- **Warna & tipografi** → variabel di bagian atas `css/style.css` (`:root { --emerald: ...; --gold: ...; }`).
- **Nama, alamat, kontak, rekening, motto** → objek `profil` dan `rekening` di `js/data.js`.
- **Logo** → ganti isi `<symbol id="star-mark">` di `index.html`/`admin.html` dan `assets/images/favicon.svg`.
- **Foto hero** (ilustrasi geometris) → ganti `<symbol id="hero-art">` di `index.html` dengan `<img>` foto asli pesantren bila sudah punya.

## 8. Ide pengembangan lanjutan (opsional)

Beberapa hal yang bisa ditambahkan kalau kebutuhanmu berkembang: kompresi
foto otomatis sebelum upload, autentikasi admin yang lebih kuat (misalnya
lewat Google Sign-In), progress bar donasi per program (perlu backend
menghitung total), pencarian di halaman Berita, dan versi multi-bahasa
(Indonesia/English). Bukan bagian dari build saat ini, tapi arsitekturnya
mendukung untuk ditambahkan bertahap.