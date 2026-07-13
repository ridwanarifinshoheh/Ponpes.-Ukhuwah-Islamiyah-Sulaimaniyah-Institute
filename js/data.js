/**
 * data.js — Konten dasar website Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute
 * -----------------------------------------------------------------------------
 * Edit file ini langsung di PyCharm untuk mengubah isi Galeri, Berita, dan Fasilitas
 * secara PERMANEN (akan tampil sama untuk semua pengunjung setelah kamu push ke GitHub).
 *
 * Panel admin (admin.html) hanya menambah "lapisan tambahan" sementara di browser
 * admin sendiri — cocok untuk update cepat, lalu bisa di-export ke JSON dan
 * disalin ke sini agar permanen. Lihat README.md bagian "Alur kerja konten".
 *
 * PENTING: field "img" memakai path relatif ke folder assets/images/.
 * Taruh file fotomu di sana dengan nama yang sama, atau ganti path-nya.
 */

const SITE_DATA = {

  profil: {
    nama: "Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute",
    motto: "بِالْعِلْمِ وَالْأُخُوَّةِ نَبْنِي الْأُمَّةَ",
    mottoTerjemahan: "Dengan ilmu dan ukhuwah, kami membangun umat",
    tahunBerdiri: 2005,
    alamat: "Jl. Ukhuwah Islamiyah No. 1, (lengkapi alamat pesantren)",
    kota: "Semarang, Jawa Tengah",
    telepon: "+62 812-0000-0000",
    whatsapp: "6281200000000",
    email: "info@sulaimaniyahinstitute.sch.id",
    instagram: "https://instagram.com/sulaimaniyah.institute",
    facebook: "https://facebook.com/sulaimaniyahinstitute",
    youtube: "https://youtube.com/@sulaimaniyahinstitute",
    mapsEmbedQuery: "Masjid Ukhuwah Islamiyah El Azhar",
    jamOperasional: "Senin–Sabtu, 08.00–16.00 WIB",
    sambutan: "Inilah wasiatku atas dirimu: Janganlah kau terpecah belah. Janganlah membeda-bedakan suku bangsa. Janganlah engkau tersesat dengan mengikuti jalan selain Ahlu Sunnah wal Jamaah (Sunnah Nabi).",
    sejarah: "Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute adalah pesantren mahasiswa di bawah naungan Yayasan Tahfidz Sulaimaniyah yang dirancang khusus untuk memfasilitasi mahasiswa menyeimbangkan pendidikan akademik kampus dengan pendalaman ilmu agama Islam.",
    visi: "Mencetak generasi yang menerapkan Al-Qur’an dan Sunnah Rasulullah SAW dalam kehidupan sehari-hari guna mendapatkan Ridha Ilahi.",
    misi: [
      "Pendalaman komprehensif mengenai ilmu fikih, tauhid, nahwu, dan sharaf.",
      "Pembinaan adab dan akhlak keseharian, serta penguasaan bahasa Arab dan bahasa Turki.",
      "Menumbuhkan semangat ukhuwah islamiyah antar santri dan masyarakat",
    ]
  },

  statistik: [
    { label: "Santri Aktif", nilai: 420, suffix: "+" },
    { label: "Tenaga Pengajar", nilai: 38, suffix: "" },
    { label: "Alumni", nilai: 1650, suffix: "+" },
    { label: "Tahun Pengabdian", nilai: new Date().getFullYear() - 2005, suffix: "" }
  ],

  fasilitas: [
    { icon: "mosque", judul: "Masjid & Aula Utama", deskripsi: "Pusat ibadah dan kegiatan keagamaan santri, menampung lebih dari 500 jamaah." },
    { icon: "book", judul: "Perpustakaan & Ruang Kitab", deskripsi: "Koleksi kitab kuning, buku pelajaran umum, dan ruang baca yang nyaman." },
    { icon: "home", judul: "Asrama Putra", deskripsi: "Asrama terpisah dengan pembina yang mendampingi keseharian santri." },
    { icon: "flask", judul: "Laboratorium & Ruang Kelas", deskripsi: "Ruang belajar formal dengan fasilitas penunjang sains dan komputer." },
    { icon: "heart", judul: "Klinik Kesehatan Santri", deskripsi: "Layanan kesehatan dasar dan pemantauan gizi santri secara rutin." },
    { icon: "ball", judul: "Lapangan Olahraga", deskripsi: "Area olahraga untuk menjaga kebugaran jasmani santri." }
  ],

  /**
   * Galeri — tambahkan objek baru untuk menambah foto.
   * kategori: "kegiatan" | "belajar" | "acara" | "fasilitas"
   */
  galeri: [
    { id: "g1", judul: "Kajian Kitab Kuning Ba'da Subuh", kategori: "belajar", img: "" },
    { id: "g2", judul: "Peringatan Maulid Nabi", kategori: "acara", img: "" },
    { id: "g3", judul: "Gotong Royong Santri", kategori: "kegiatan", img: "" },
    { id: "g4", judul: "Wisuda Tahfidz Angkatan", kategori: "acara", img: "" },
    { id: "g5", judul: "Praktikum Laboratorium", kategori: "belajar", img: "" },
    { id: "g6", judul: "Turnamen Olahraga Santri", kategori: "kegiatan", img: "" },
    { id: "g7", judul: "Suasana Pesantren", kategori: "fasilitas", img: "" },
    { id: "g8", judul: "Bakti Sosial Ramadhan", kategori: "kegiatan", img: "" }
  ],

  /**
   * Berita/Informasi — tambahkan objek baru untuk menambah artikel/pengumuman.
   * kategori: "pengumuman" | "kegiatan" | "artikel"
   */
  berita: [
    {
      id: "b1",
      kategori: "pengumuman",
      tanggal: "2026-06-01",
      judul: "Pembukaan Pendaftaran Santri Baru Tahun Ajaran 2026/2027",
      ringkasan: "Pesantren membuka pendaftaran santri baru untuk jenjang Tsanawiyah dan Aliyah mulai 1 Juni 2026.",
      isi: "Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute membuka pendaftaran santri baru tahun ajaran 2026/2027 untuk jenjang Tsanawiyah dan Aliyah. Calon santri dapat mendaftar melalui formulir pendaftaran pada website ini. Kuota terbatas, pendaftaran ditutup sewaktu-waktu apabila kuota telah terpenuhi. Silakan hubungi panitia melalui WhatsApp untuk informasi lebih lanjut."
    },
    {
      id: "b2",
      kategori: "kegiatan",
      tanggal: "2026-05-20",
      judul: "Kegiatan Bakti Sosial Menyambut Ramadhan",
      ringkasan: "Santri dan pengasuh menyalurkan bantuan sosial kepada warga sekitar pesantren.",
      isi: "Sebagai bagian dari pembinaan kepedulian sosial, santri bersama pengasuh melaksanakan kegiatan bakti sosial berupa pembagian sembako kepada warga sekitar pesantren. Kegiatan ini rutin dilaksanakan setiap menjelang bulan suci Ramadhan sebagai wujud ukhuwah islamiyah dengan masyarakat sekitar."
    },
    {
      id: "b3",
      kategori: "artikel",
      tanggal: "2026-05-10",
      judul: "Pentingnya Ukhuwah Islamiyah dalam Pendidikan Pesantren",
      ringkasan: "Ukhuwah bukan sekadar slogan, tetapi nilai yang dipraktikkan dalam keseharian santri.",
      isi: "Ukhuwah islamiyah menjadi salah satu nilai inti dalam pendidikan di pesantren ini. Santri dibina untuk saling membantu, menghormati perbedaan asal daerah, dan membangun ikatan persaudaraan yang melampaui hubungan kekerabatan biasa. Nilai ini tercermin dalam kegiatan sehari-hari, mulai dari belajar bersama hingga gotong royong menjaga kebersihan lingkungan pesantren."
    }
  ],

  program_pendidikan: [
    { jenjang: "Tsanawiyah", deskripsi: "Setara SMP, memadukan kurikulum diniyah dan nasional." },
    { jenjang: "Aliyah", deskripsi: "Setara SMA, dengan penjurusan Keagamaan dan IPA/IPS." },
    { jenjang: "Tahfidz", deskripsi: "Program unggulan menghafal Al-Qur'an dengan target dan bimbingan intensif." }
  ],

  donasiProgram: [
    { icon: "coin", judul: "Infaq Operasional", deskripsi: "Mendukung biaya operasional harian pesantren dan kebutuhan mahasantri berprestasi." },
    { icon: "building", judul: "Wakaf Pembangunan", deskripsi: "Pembangunan dan renovasi sarana belajar, asrama, masjid dan lainnya." },
    { icon: "scholar", judul: "Beasiswa Santri Ke Turki", deskripsi: "Membiayai kebutuhan harian mahasantri selama masa pendidikan di Turki." },
    { icon: "hands", judul: "Sosial & Kemanusiaan", deskripsi: "Bantuan bencana, kesehatan, dan kegiatan sosial kemasyarakatan sekitar pesantren." }
  ],

  rekening: [
    { bank: "Bank Syariah Indonesia (BSI)", nomor: "723124341", atasNama: "Yayasan Sulaimaniyah Jawa Tengah" },
  ],

  testimoni: [
    { nama: "Bapak Ahmad Fauzi", peran: "Wali Santri, Kelas Aliyah", isi: "Alhamdulillah, perkembangan akhlak dan hafalan anak saya sangat terasa sejak mondok di sini. Pembina sangat perhatian pada setiap santri." },
    { nama: "Bapak Ahmad Fauzi", peran: "Wali Santri, Kelas Aliyah", isi: "Alhamdulillah, perkembangan akhlak dan hafalan anak saya sangat terasa sejak mondok di sini. Pembina sangat perhatian pada setiap santri." },
    { nama: "Bapak Ahmad Fauzi", peran: "Wali Santri, Kelas Aliyah", isi: "Alhamdulillah, perkembangan akhlak dan hafalan anak saya sangat terasa sejak mondok di sini. Pembina sangat perhatian pada setiap santri." },
  ],

  faq: [
    { q: "Berapa biaya pendaftaran santri baru?", a: "Rincian biaya pendaftaran dan syahriah dapat ditanyakan langsung melalui WhatsApp pengurus pesantren, karena dapat berubah tiap tahun ajaran." },
    { q: "Bagaimana cara memastikan donasi saya sudah diterima?", a: "Setelah transfer, silakan isi formulir konfirmasi donasi pada halaman ini agar tercatat, atau kirim bukti transfer melalui WhatsApp." },
    { q: "Apakah ada program beasiswa untuk melanjutkan studi ke Turki?", a: "Ada, melalui program beasiswa yang didanai dari donasi para donatur dan dermawan. Silakan hubungi panitia untuk informasi lebih lanjut." }
  ]
};