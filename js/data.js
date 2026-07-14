/**
 * data.js — Konten dasar website Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute
 * -----------------------------------------------------------------------------
 * Data telah mendukung sistem Multi-Bahasa (Indonesia, English, Türkçe).
 * Field dengan akhiran _en (English) dan _tr (Türkçe) digunakan secara dinamis
 * oleh main.js sesuai pilihan bahasa pengunjung.
 */

const SITE_DATA = {

  profil: {
    nama: "Ponpes. Ukhuwah Islamiyah Sulaimaniyah Institute",
    motto: "بِالْعِلْمِ وَالْأُخُوَّةِ نَبْنِي الْأُمَّةَ",
    mottoTerjemahan: "Dengan ilmu dan ukhuwah, kami membangun umat",
    mottoTerjemahan_en: "With knowledge and brotherhood, we build the ummah",
    mottoTerjemahan_tr: "İlim ve uhuvvet ile ümmeti inşa ediyoruz",

    tahunBerdiri: 2005,
    alamat: "Jl. Ukhuwah Islamiyah No. 1, (lengkapi alamat pesantren)",
    kota: "Semarang, Jawa Tengah",
    kota_en: "Semarang, Central Java",
    kota_tr: "Semarang, Orta Cava",

    telepon: "+62 812-0000-0000",
    whatsapp: "6281200000000",
    email: "info@sulaimaniyahinstitute.sch.id",
    instagram: "https://instagram.com/sulaimaniyah.institute",
    facebook: "https://facebook.com/sulaimaniyahinstitute",
    youtube: "https://youtube.com/@sulaimaniyahinstitute",
    mapsEmbedQuery: "Masjid Ukhuwah Islamiyah El Azhar",

    jamOperasional: "Senin–Sabtu, 08.00–16.00 WIB",
    jamOperasional_en: "Monday–Saturday, 08:00–16:00 WIB",
    jamOperasional_tr: "Pazartesi–Cumartesi, 08:00–16:00 WIB",

    sambutan: "Inilah wasiatku atas dirimu: Janganlah kau terpecah belah. Janganlah membeda-bedakan suku bangsa. Janganlah engkau tersesat dengan mengikuti jalan selain Ahlu Sunnah wal Jamaah (Sunnah Nabi).",
    sambutan_en: "This is my testament to you: Do not be divided. Do not discriminate against ethnicities. Do not go astray by following a path other than Ahlu Sunnah wal Jamaah (the Sunnah of the Prophet).",
    sambutan_tr: "İşte size vasiyetim: Asla bölünmeyin. Irk ayrımı yapmayın. Ehl-i Sünnet vel Cemaat (Peygamberin Sünneti) dışındaki bir yola uyarak sapmayın.",

    sejarah: "Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute adalah pesantren mahasiswa di bawah naungan Yayasan Tahfidz Sulaimaniyah yang dirancang khusus untuk memfasilitasi mahasiswa menyeimbangkan pendidikan akademik kampus dengan pendalaman ilmu agama Islam.",
    sejarah_en: "The Ukhuwah Islamiyah Sulaimaniyah Institute is an Islamic boarding school for university students under the auspices of the Sulaimaniyah Tahfidz Foundation, specially designed to facilitate students in balancing campus academic education with deepening Islamic religious knowledge.",
    sejarah_tr: "Ukhuwah İslamiyah Süleymaniye Enstitüsü, Süleymaniye Tahfiz Vakfı himayesinde, üniversite öğrencilerinin kampüs akademik eğitimlerini İslami dini bilgilerin derinleştirilmesiyle dengelemelerini sağlamak için özel olarak tasarlanmış bir İslami öğrenci yurdudur.",

    visi: "Mencetak generasi yang menerapkan Al-Qur’an dan Sunnah Rasulullah SAW dalam kehidupan sehari-hari guna mendapatkan Ridha Ilahi.",
    visi_en: "Molding a generation that applies the Qur'an and the Sunnah of the Prophet Muhammad SAW in daily life to attain Divine Pleasure.",
    visi_tr: "İlahi Rızayı kazanmak için Kur'an'ı ve Hz. Muhammed (SAV)'in Sünneti'ni günlük yaşamda uygulayan bir nesil yetiştirmek.",

    misi: [
      {
        id: "Pendalaman komprehensif mengenai ilmu fikih, tauhid, nahwu, dan sharaf.",
        en: "Comprehensive deepening of the sciences of fiqh, tawhid, nahwu, and sharaf.",
        tr: "Fıkıh, tevhid, nahiv ve sarf ilimlerinde kapsamlı derinleşme."
      },
      {
        id: "Pembinaan adab dan akhlak keseharian, serta penguasaan bahasa Arab dan bahasa Turki.",
        en: "Cultivation of daily adab and morals, as well as mastery of Arabic and Turkish languages.",
        tr: "Günlük adap ve ahlakın geliştirilmesi ile Arapça ve Türkçe dillerine hakimiyet."
      },
      {
        id: "Menumbuhkan semangat ukhuwah islamiyah antar santri dan masyarakat",
        en: "Fostering the spirit of Islamic brotherhood among students and the community.",
        tr: "Öğrenciler ve toplum arasında İslam kardeşliği (uhuvvet) ruhunu teşvik etmek."
      }
    ]
  },

  statistik: [
    { label: "Santri Aktif", label_en: "Active Students", label_tr: "Aktif Talebeler", nilai: 126, suffix: "+" },
    { label: "Tenaga Pengajar", label_en: "Teaching Staff", label_tr: "Eğitmen Kadrosu", nilai: 4, suffix: "" },
    { label: "Alumni", label_en: "Alumni", label_tr: "Mezunlar", nilai: 1650, suffix: "+" },
    { label: "Tahun Pengabdian", label_en: "Years of Service", label_tr: "Hizmet Yılı", nilai: new Date().getFullYear() - 2005, suffix: "" }
  ],

  fasilitas: [
    {
      icon: "mosque",
      judul: "Masjid & Aula Utama",
      judul_en: "Mosque & Main Hall",
      judul_tr: "Mescit & Ana Salon",
      deskripsi: "Pusat ibadah dan kegiatan keagamaan santri, menampung lebih dari 500 jamaah.",
      deskripsi_en: "Center for worship and religious activities, accommodating more than 500 worshippers.",
      deskripsi_tr: "500'den fazla cemaati ağırlayabilen ibadet ve dini faaliyetler merkezi."
    },
    {
      icon: "book",
      judul: "Perpustakaan & Ruang Kitab",
      judul_en: "Library & Book Room",
      judul_tr: "Kütüphane & Kitap Odası",
      deskripsi: "Koleksi kitab kuning, buku pelajaran umum, dan ruang baca yang nyaman.",
      deskripsi_en: "Collection of classic Islamic texts, general textbooks, and a comfortable reading room.",
      deskripsi_tr: "Klasik İslami eserler, genel ders kitapları koleksiyonu ve rahat bir okuma odası."
    },
    {
      icon: "home",
      judul: "Asrama Putra",
      judul_en: "Boys' Dormitory",
      judul_tr: "Erkek Yurdu",
      deskripsi: "Asrama terpisah dengan pembina yang mendampingi keseharian santri.",
      deskripsi_en: "Separate dormitory with mentors assisting students in their daily lives.",
      deskripsi_tr: "Talebelerin günlük yaşamlarında onlara rehberlik eden hocaların bulunduğu ayrı yurt."
    },
    {
      icon: "flask",
      judul: "Laboratorium & Ruang Kelas",
      judul_en: "Laboratory & Classrooms",
      judul_tr: "Laboratuvar & Sınıflar",
      deskripsi: "Ruang belajar formal dengan fasilitas penunjang sains dan komputer.",
      deskripsi_en: "Formal learning spaces with science and computer support facilities.",
      deskripsi_tr: "Fen ve bilgisayar destek tesislerine sahip resmi öğrenim alanları."
    },
    {
      icon: "heart",
      judul: "Klinik Kesehatan Santri",
      judul_en: "Student Health Clinic",
      judul_tr: "Talebe Sağlık Kliniği",
      deskripsi: "Layanan kesehatan dasar dan pemantauan gizi santri secara rutin.",
      deskripsi_en: "Basic health services and regular monitoring of students' nutrition.",
      deskripsi_tr: "Temel sağlık hizmetleri ve talebelerin beslenmesinin düzenli takibi."
    },
    {
      icon: "ball",
      judul: "Lapangan Olahraga",
      judul_en: "Sports Field",
      judul_tr: "Spor Sahası",
      deskripsi: "Area olahraga untuk menjaga kebugaran jasmani santri.",
      deskripsi_en: "Sports area to maintain students' physical fitness.",
      deskripsi_tr: "Talebelerin fiziksel zindeliğini korumak için spor alanı."
    }
  ],

  galeri: [
    {
      id: "g1", kategori: "belajar", img: "",
      judul: "Kajian Kitab Kuning Ba'da Subuh",
      judul_en: "Classic Book Study After Fajr",
      judul_tr: "Sabah Namazı Sonrası Klasik Kitap Mütalaası"
    },
    {
      id: "g2", kategori: "acara", img: "",
      judul: "Peringatan Maulid Nabi",
      judul_en: "Commemoration of the Prophet's Birthday",
      judul_tr: "Mevlid Kandili Kutlaması"
    },
    {
      id: "g3", kategori: "kegiatan", img: "",
      judul: "Gotong Royong Santri",
      judul_en: "Student Mutual Cooperation",
      judul_tr: "Talebelerin İmece Çalışması"
    },
    {
      id: "g4", kategori: "acara", img: "",
      judul: "Wisuda Tahfidz Angkatan",
      judul_en: "Tahfidz Graduation Ceremony",
      judul_tr: "Hafızlık Mezuniyet Töreni"
    },
    {
      id: "g5", kategori: "belajar", img: "",
      judul: "Praktikum Laboratorium",
      judul_en: "Laboratory Practicum",
      judul_tr: "Laboratuvar Uygulaması"
    },
    {
      id: "g6", kategori: "kegiatan", img: "",
      judul: "Turnamen Olahraga Santri",
      judul_en: "Student Sports Tournament",
      judul_tr: "Talebe Spor Turnuvası"
    },
    {
      id: "g7", kategori: "fasilitas", img: "",
      judul: "Suasana Pesantren",
      judul_en: "Boarding School Atmosphere",
      judul_tr: "Yurt Atmosferi"
    },
    {
      id: "g8", kategori: "kegiatan", img: "",
      judul: "Bakti Sosial Ramadhan",
      judul_en: "Ramadan Social Service",
      judul_tr: "Ramazan Sosyal Yardımlaşması"
    }
  ],

  berita: [
    {
      id: "b1",
      kategori: "pengumuman",
      tanggal: "2026-06-01",
      judul: "Pembukaan Pendaftaran Santri Baru Tahun Ajaran 2026/2027",
      judul_en: "Opening of New Student Registration for the 2026/2027 Academic Year",
      judul_tr: "2026/2027 Eğitim-Öğretim Yılı Yeni Talebe Kayıtlarının Açılması",
      ringkasan: "Pesantren membuka pendaftaran santri baru untuk jenjang Tsanawiyah dan Aliyah mulai 1 Juni 2026.",
      ringkasan_en: "The boarding school opens new student registrations for the Tsanawiyah and Aliyah levels starting June 1, 2026.",
      ringkasan_tr: "Yurdumuz, 1 Haziran 2026'dan itibaren Tsanawiyah (Ortaokul) ve Aliyah (Lise) seviyeleri için yeni talebe kayıtlarını açıyor.",
      isi: "Pesantren Ukhuwah Islamiyah Sulaimaniyah Institute membuka pendaftaran santri baru tahun ajaran 2026/2027 untuk jenjang Tsanawiyah dan Aliyah. Calon santri dapat mendaftar melalui formulir pendaftaran pada website ini. Kuota terbatas, pendaftaran ditutup sewaktu-waktu apabila kuota telah terpenuhi. Silakan hubungi panitia melalui WhatsApp untuk informasi lebih lanjut.",
      isi_en: "The Ukhuwah Islamiyah Sulaimaniyah Institute is opening new student registrations for the 2026/2027 academic year for Tsanawiyah and Aliyah levels. Prospective students can apply through the registration form on this website. Quotas are limited, and registration may close at any time if the quota is met. Please contact the committee via WhatsApp for further information.",
      isi_tr: "Ukhuwah İslamiyah Süleymaniye Enstitüsü, Tsanawiyah ve Aliyah seviyeleri için 2026/2027 eğitim-öğretim yılı yeni talebe kayıtlarını açıyor. Aday talebeler bu web sitesindeki kayıt formu aracılığıyla başvurabilirler. Kontenjanlar sınırlıdır ve kontenjan dolduğunda kayıtlar her an kapanabilir. Daha fazla bilgi için lütfen WhatsApp üzerinden komite ile iletişime geçin."
    },
    {
      id: "b2",
      kategori: "kegiatan",
      tanggal: "2026-05-20",
      judul: "Kegiatan Bakti Sosial Menyambut Ramadhan",
      judul_en: "Social Service Activities Welcoming Ramadan",
      judul_tr: "Ramazan'ı Karşılama Sosyal Yardımlaşma Faaliyetleri",
      ringkasan: "Santri dan pengasuh menyalurkan bantuan sosial kepada warga sekitar pesantren.",
      ringkasan_en: "Students and caretakers distribute social assistance to the community around the boarding school.",
      ringkasan_tr: "Talebeler ve hocalar yurt çevresindeki halka sosyal yardım dağıttı.",
      isi: "Sebagai bagian dari pembinaan kepedulian sosial, santri bersama pengasuh melaksanakan kegiatan bakti sosial berupa pembagian sembako kepada warga sekitar pesantren. Kegiatan ini rutin dilaksanakan setiap menjelang bulan suci Ramadhan sebagai wujud ukhuwah islamiyah dengan masyarakat sekitar.",
      isi_en: "As part of cultivating social awareness, students alongside caretakers conducted social service activities by distributing basic food supplies to residents around the boarding school. This activity is routinely carried out every time the holy month of Ramadan approaches as a manifestation of Islamic brotherhood with the surrounding community.",
      isi_tr: "Sosyal farkındalığı geliştirmenin bir parçası olarak, talebeler ve hocalar yurt çevresindeki sakinlere temel gıda malzemeleri dağıtarak sosyal hizmet faaliyetleri yürüttüler. Bu faaliyet, çevredeki toplumla İslam kardeşliğinin (uhuvvet) bir tecellisi olarak her mübarek Ramazan ayı yaklaşırken rutin olarak gerçekleştirilmektedir."
    },
    {
      id: "b3",
      kategori: "artikel",
      tanggal: "2026-05-10",
      judul: "Pentingnya Ukhuwah Islamiyah dalam Pendidikan Pesantren",
      judul_en: "The Importance of Islamic Brotherhood in Boarding School Education",
      judul_tr: "Yurt Eğitiminde İslam Kardeşliğinin Önemi",
      ringkasan: "Ukhuwah bukan sekadar slogan, tetapi nilai yang dipraktikkan dalam keseharian santri.",
      ringkasan_en: "Brotherhood is not just a slogan, but a value practiced in the students' daily lives.",
      ringkasan_tr: "Uhuvvet sadece bir slogan değil, talebelerin günlük yaşamlarında uygulanan bir değerdir.",
      isi: "Ukhuwah islamiyah menjadi salah satu nilai inti dalam pendidikan di pesantren ini. Santri dibina untuk saling membantu, menghormati perbedaan asal daerah, dan membangun ikatan persaudaraan yang melampaui hubungan kekerabatan biasa. Nilai ini tercermin dalam kegiatan sehari-hari, mulai dari belajar bersama hingga gotong royong menjaga kebersihan lingkungan pesantren.",
      isi_en: "Islamic brotherhood is one of the core values in education at this boarding school. Students are guided to help each other, respect differences in regional origins, and build bonds of brotherhood that transcend ordinary kinship. This value is reflected in daily activities, from studying together to working mutually to maintain the cleanliness of the boarding school environment.",
      isi_tr: "İslam kardeşliği (uhuvvet), bu yurttaki eğitimin temel değerlerinden biridir. Talebeler birbirlerine yardım etmeye, bölgesel köken farklılıklarına saygı duymaya ve sıradan akrabalığı aşan kardeşlik bağları kurmaya yönlendirilir. Bu değer, birlikte çalışmaktan yurt çevresinin temizliğini korumak için imece usulü çalışmaya kadar günlük faaliyetlere yansır."
    }
  ],

  donasiProgram: [
    {
      icon: "coin",
      judul: "Infaq Operasional",
      judul_en: "Operational Infaq",
      judul_tr: "İşletme İnfakı",
      deskripsi: "Mendukung biaya operasional harian pesantren dan kebutuhan mahasantri berprestasi.",
      deskripsi_en: "Supports the daily operational costs of the boarding school and the needs of achieving students.",
      deskripsi_tr: "Yurdun günlük işletme maliyetlerini ve başarılı talebelerin ihtiyaçlarını destekler."
    },
    {
      icon: "building",
      judul: "Wakaf Pembangunan",
      judul_en: "Development Waqf",
      judul_tr: "İnşaat Vakfı",
      deskripsi: "Pembangunan dan renovasi sarana belajar, asrama, masjid dan lainnya.",
      deskripsi_en: "Construction and renovation of learning facilities, dormitories, mosques, and others.",
      deskripsi_tr: "Öğrenim tesislerinin, yurtların, mescitlerin ve diğerlerinin inşası ve yenilenmesi."
    },
    {
      icon: "scholar",
      judul: "Beasiswa Santri Ke Turki",
      judul_en: "Student Scholarship to Turkey",
      judul_tr: "Türkiye Eğitim Bursu",
      deskripsi: "Membiayai kebutuhan harian mahasantri selama masa pendidikan di Turki.",
      deskripsi_en: "Financing the daily needs of university students during their education period in Turkey.",
      deskripsi_tr: "Türkiye'deki eğitim süreleri boyunca üniversite öğrencilerinin (mahasantri) günlük ihtiyaçlarının karşılanması."
    },
    {
      icon: "hands",
      judul: "Sosial & Kemanusiaan",
      judul_en: "Social & Humanitarian",
      judul_tr: "Sosyal & İnsani Yardım",
      deskripsi: "Bantuan bencana, kesehatan, dan kegiatan sosial kemasyarakatan sekitar pesantren.",
      deskripsi_en: "Disaster relief, health, and social community activities around the boarding school.",
      deskripsi_tr: "Yurt çevresindeki afet yardımı, sağlık ve sosyal toplum faaliyetleri."
    }
  ],

  rekening: [
    { bank: "Bank Syariah Indonesia (BSI)", nomor: "723124341", atasNama: "Yayasan Sulaimaniyah Jawa Tengah" },
  ],

  testimoni: [
    {
      nama: "Bapak Ahmad Fauzi",
      peran: "Wali Santri, Kelas Aliyah",
      peran_en: "Parent, Aliyah Class",
      peran_tr: "Veli, Aliyah Sınıfı",
      isi: "Alhamdulillah, perkembangan akhlak dan hafalan anak saya sangat terasa sejak mondok di sini. Pembina sangat perhatian pada setiap santri.",
      isi_en: "Alhamdulillah, the development of my child's morals and memorization has been very noticeable since staying here. The mentors are very attentive to every student.",
      isi_tr: "Elhamdülillah, çocuğumun ahlakındaki ve ezberindeki gelişim burada kaldığından beri çok belirgin. Hocalar her talebe ile çok ilgili."
    },
    {
      nama: "Bapak Budi Santoso",
      peran: "Wali Santri, Kelas Tsanawiyah",
      peran_en: "Parent, Tsanawiyah Class",
      peran_tr: "Veli, Tsanawiyah Sınıfı",
      isi: "Alhamdulillah, perkembangan akhlak dan hafalan anak saya sangat terasa sejak mondok di sini. Pembina sangat perhatian pada setiap santri.",
      isi_en: "Alhamdulillah, the development of my child's morals and memorization has been very noticeable since staying here. The mentors are very attentive to every student.",
      isi_tr: "Elhamdülillah, çocuğumun ahlakındaki ve ezberindeki gelişim burada kaldığından beri çok belirgin. Hocalar her talebe ile çok ilgili."
    },
    {
      nama: "Ibu Siti Aisyah",
      peran: "Wali Santri, Kelas Tahfidz",
      peran_en: "Parent, Tahfidz Class",
      peran_tr: "Veli, Tahfidz Sınıfı",
      isi: "Alhamdulillah, perkembangan akhlak dan hafalan anak saya sangat terasa sejak mondok di sini. Pembina sangat perhatian pada setiap santri.",
      isi_en: "Alhamdulillah, the development of my child's morals and memorization has been very noticeable since staying here. The mentors are very attentive to every student.",
      isi_tr: "Elhamdülillah, çocuğumun ahlakındaki ve ezberindeki gelişim burada kaldığından beri çok belirgin. Hocalar her talebe ile çok ilgili."
    }
  ],

  faq: [
    {
      q: "Berapa biaya pendaftaran santri baru?",
      q_en: "How much is the registration fee for new students?",
      q_tr: "Yeni talebe kayıt ücreti ne kadar?",
      a: "Rincian biaya pendaftaran dan syahriah dapat ditanyakan langsung melalui WhatsApp pengurus pesantren, karena dapat berubah tiap tahun ajaran.",
      a_en: "Details of registration and monthly fees can be asked directly via the boarding school management's WhatsApp, as they are subject to change every academic year.",
      a_tr: "Kayıt ve aylık ücretlerin detayları, her eğitim-öğretim yılında değişebileceği için doğrudan yurt yönetiminin WhatsApp hattından sorulabilir."
    },
    {
      q: "Bagaimana cara memastikan donasi saya sudah diterima?",
      q_en: "How can I ensure my donation has been received?",
      q_tr: "Bağışımın alındığından nasıl emin olabilirim?",
      a: "Setelah transfer, silakan isi formulir konfirmasi donasi pada halaman ini agar tercatat, atau kirim bukti transfer melalui WhatsApp.",
      a_en: "After transferring, please fill out the donation confirmation form on this page so it is recorded, or send the transfer receipt via WhatsApp.",
      a_tr: "Havale işleminden sonra, kaydedilmesi için lütfen bu sayfadaki bağış onay formunu doldurun veya havale makbuzunu WhatsApp üzerinden gönderin."
    },
    {
      q: "Apakah ada program beasiswa untuk melanjutkan studi ke Turki?",
      q_en: "Is there a scholarship program to continue studies in Turkey?",
      q_tr: "Türkiye'de eğitime devam etmek için burs programı var mı?",
      a: "Ada, melalui program beasiswa yang didanai dari donasi para donatur dan dermawan. Silakan hubungi panitia untuk informasi lebih lanjut.",
      a_en: "Yes, through a scholarship program funded by donations from donors and philanthropists. Please contact the committee for more information.",
      a_tr: "Evet, bağışçılar ve hayırseverlerin bağışlarıyla finanse edilen bir burs programı aracılığıyla. Daha fazla bilgi için lütfen komite ile iletişime geçin."
    }
  ]
};