import Link from "next/link";
import type { Metadata } from "next";
import { CITY } from "@/lib/services";

export const metadata: Metadata = {
  title: "Pertanyaan Umum (FAQ) | Beresin",
  description:
    "Pertanyaan yang paling sering ditanyakan tentang memesan tukang lewat Beresin di " + CITY + ".",
};

const groups = [
  {
    heading: "Memesan",
    items: [
      {
        q: "Berapa biaya memakai Beresin?",
        a: "Gratis untuk pemilik rumah. Kamu hanya membayar ongkos jasa tukang dan material, langsung ke tukangnya. Beresin mengenakan biaya ke sisi tukang, bukan ke kamu.",
      },
      {
        q: "Saya tidak tahu masalahnya apa. Tetap bisa pesan?",
        a: "Bisa. Tulis saja apa yang kamu lihat atau dengar, misalnya 'AC bunyi dan air menetes'. Tukang akan menanyakan detail lain sebelum memberi harga. Kalau benar-benar tidak yakin masuk kategori mana, pilih Lainnya.",
      },
      {
        q: "Area mana saja yang dilayani?",
        a: `Saat ini hanya ${CITY}: Ciputat, Pamulang, Serpong, Bintaro, Pondok Aren, dan sekitarnya. Kami memilih melayani satu wilayah dengan baik lebih dulu sebelum melebar.`,
      },
      {
        q: "Bisa pesan untuk hari ini juga?",
        a: "Bisa, tapi tidak dijamin. Pesanan mendesak tergantung siapa yang sedang kosong. Untuk pekerjaan yang bisa ditunggu, pesan sehari sebelumnya jauh lebih pasti.",
      },
    ],
  },
  {
    heading: "Harga",
    items: [
      {
        q: "Kenapa harganya berupa kisaran, bukan angka pasti?",
        a: "Karena pekerjaan yang sama bisa berbeda jauh tergantung kondisi di lapangan. Kisaran di halaman layanan menunjukkan yang wajar di pasaran. Angka pastinya kamu terima sebagai penawaran sebelum tukang mulai bekerja.",
      },
      {
        q: "Apakah material sudah termasuk?",
        a: "Belum. Semua harga di Beresin adalah ongkos jasa. Freon, pipa, kabel, cat, dan sparepart dihitung terpisah dan harus disepakati sebelum dibeli.",
      },
      {
        q: "Bagaimana kalau tukang minta tambahan di tengah pekerjaan?",
        a: "Tambahan hanya boleh kalau ada temuan baru, dan harus disetujui kamu dulu. Kalau ada tukang yang menaikkan harga sepihak, laporkan lewat halaman pesanan. Kami cabut verifikasinya.",
      },
      {
        q: "Bayarnya bagaimana?",
        a: "Langsung ke tukang setelah pekerjaan selesai, tunai atau transfer. Beresin tidak menampung uang kamu dan tidak meminta pembayaran di muka.",
      },
    ],
  },
  {
    heading: "Tukang dan jaminan",
    items: [
      {
        q: "Apa arti 'terverifikasi'?",
        a: "Kami memeriksa KTP, memastikan orangnya benar tinggal di area layanan, mengecek pengalaman, dan menghubungi referensi pekerjaan sebelumnya. Tukang yang belum lolos tidak bisa menerima pesanan.",
      },
      {
        q: "Bagaimana kalau hasilnya tidak memuaskan?",
        a: "Laporkan lewat halaman pesanan dalam 7 hari. Untuk pekerjaan yang jelas tidak selesai atau salah kerjakan, kami minta tukang memperbaiki tanpa biaya tambahan.",
      },
      {
        q: "Tukangnya tidak datang. Apa yang terjadi?",
        a: "Pesanan kembali terbuka dan diteruskan ke tukang lain. Ketidakhadiran tanpa kabar tercatat dan berpengaruh ke status verifikasi mereka.",
      },
      {
        q: "Saya tukang. Bagaimana cara bergabung?",
        a: "Pendaftaran tukang belum dibuka lewat aplikasi. Untuk sekarang hubungi kami langsung, dan proses verifikasi dimulai dengan pengecekan identitas dan referensi.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="eyebrow">Bantuan</p>
      <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        Pertanyaan umum
      </h1>
      <p className="mt-3 text-lg text-steel">
        Kalau jawabannya tidak ada di sini, tanyakan lewat halaman pesanan kamu.
      </p>

      {groups.map((group) => (
        <section key={group.heading} className="mt-10">
          <h2 className="eyebrow">{group.heading}</h2>
          <div className="mt-3 divide-y divide-line border-y border-line">
            {group.items.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold">
                  {item.q}
                  <span className="mt-0.5 shrink-0 text-hivis transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-2.5 text-steel">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-12 card p-6">
        <h2 className="text-lg font-bold">Siap memesan?</h2>
        <p className="mt-1.5 text-sm text-steel">
          Tidak ada biaya sampai kamu menyetujui harga dari tukang.
        </p>
        <Link href="/buat-pesanan" className="btn btn-primary mt-4">Pesan tukang</Link>
      </div>
    </div>
  );
}
