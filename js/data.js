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
    mapsEmbedQuery: "Semarang, Jawa Tengah",
    jamOperasional: "Senin–Sabtu, 08.00–16.00 WIB",
    sambutan: "Selamat datang di rumah kedua bagi putra-putri Muslim yang ingin tumbuh dalam naungan ilmu, adab, dan ukhuwah. Kami mendidik santri bukan hanya untuk pandai, tetapi juga untuk berakhlak dan bermanfaat bagi sesama.",
    sejarah: "Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute didirikan atas semangat menyatukan pendidikan agama yang kokoh dengan wawasan keilmuan modern. Bermula dari majelis taklim sederhana, kini berkembang menjadi lembaga pendidikan yang mengasuh santri dari berbagai daerah dengan tetap menjaga nilai kekeluargaan dan ukhuwah islamiyah.",
    visi: "Menjadi lembaga pendidikan Islam yang melahirkan generasi berilmu, berakhlak mulia, dan bermanfaat bagi umat.",
    misi: [
      "Menyelenggarakan pendidikan diniyah dan formal yang seimbang",
      "Membina akhlak santri melalui keteladanan dan kedisiplinan",
      "Menumbuhkan semangat ukhuwah islamiyah antar santri dan masyarakat",
      "Membekali santri dengan kecakapan hidup dan wawasan sosial"
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
    { icon: "home", judul: "Asrama Putra & Putri", deskripsi: "Asrama terpisah dengan pembina yang mendampingi keseharian santri." },
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
    { id: "g7", judul: "Suasana Asrama Putri", kategori: "fasilitas", img: "" },
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
    { icon: "coin", judul: "Infaq Operasional", deskripsi: "Mendukung biaya operasional harian pesantren dan kebutuhan santri dhuafa." },
    { icon: "building", judul: "Wakaf Pembangunan", deskripsi: "Pembangunan dan renovasi sarana belajar, asrama, dan masjid." },
    { icon: "scholar", judul: "Beasiswa Yatim & Dhuafa", deskripsi: "Membiayai pendidikan santri yatim dan kurang mampu agar tetap dapat menuntut ilmu." },
    { icon: "hands", judul: "Sosial & Kemanusiaan", deskripsi: "Bantuan bencana, kesehatan, dan kegiatan sosial kemasyarakatan sekitar pesantren." }
  ],

  rekening: [
    { bank: "Bank Syariah Indonesia (BSI)", nomor: "7123456789", atasNama: "Yayasan Ukhuwah Islamiyah Sulaimaniyah" },
    { bank: "Bank Mandiri", nomor: "1350012345678", atasNama: "Yayasan Ukhuwah Islamiyah Sulaimaniyah" }
  ],

  testimoni: [
    { nama: "Bapak Ahmad Fauzi", peran: "Wali Santri, Kelas Aliyah", isi: "Alhamdulillah, perkembangan akhlak dan hafalan anak saya sangat terasa sejak mondok di sini. Pembina sangat perhatian pada setiap santri." },
    { nama: "Siti Aminah", peran: "Alumni 2019", isi: "Pesantren ini mengajarkan saya arti ukhuwah yang sesungguhnya. Ilmu agama dan umum berjalan seimbang, bekal saya hingga kuliah." },
    { nama: "Bapak Hasan Basri", peran: "Wali Santri, Kelas Tsanawiyah", isi: "Fasilitas memadai, lingkungan aman, dan komunikasi dengan wali santri selalu terbuka. Kami merasa tenang menitipkan putra kami di sini." }
  ],

  faq: [
    { q: "Berapa biaya pendaftaran santri baru?", a: "Rincian biaya pendaftaran dan syahriah dapat ditanyakan langsung melalui WhatsApp panitia, karena dapat berubah tiap tahun ajaran." },
    { q: "Apakah pesantren menerima santri dari luar kota/provinsi?", a: "Ya, pesantren menerima santri dari seluruh Indonesia. Panitia akan membantu proses penjemputan/informasi akomodasi bila diperlukan." },
    { q: "Bagaimana cara memastikan donasi saya sudah diterima?", a: "Setelah transfer, silakan isi formulir konfirmasi donasi pada halaman ini agar tercatat, atau kirim bukti transfer melalui WhatsApp." },
    { q: "Apakah ada program beasiswa untuk santri kurang mampu?", a: "Ada, melalui program Beasiswa Yatim & Dhuafa yang didanai dari donasi masyarakat. Silakan hubungi panitia untuk informasi pendaftaran beasiswa." }
  ]
};