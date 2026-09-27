import Link from "next/link";
import type { Metadata } from "next";
import { CITY } from "@/lib/services";

export const metadata: Metadata = {
  title: "Cara Kerja Beresin untuk Pemilik Rumah | Beresin",
  description:
    "Dari tulis keluhan sampai bayar setelah beres. Begini cara memesan tukang terverifikasi lewat Beresin di " + CITY + ".",
};

const steps = [
  {
    n: "01",
    title: "Tulis keluhannya",
    body: "Pilih layanan, jelaskan masalahnya sependek apa pun, isi alamat, lalu pilih hari dan waktu kunjungan. Tidak perlu tahu istilah teknis — tulis saja apa yang kamu lihat.",
    detail: "Butuh sekitar dua menit. Belum ada biaya apa pun di tahap ini.",
  },
  {
    n: "02",
    title: "Tunggu penawaran",
    body: "Pesanan diteruskan ke tukang terverifikasi yang melayani area kamu dan menguasai pekerjaannya. Mereka mengirim perkiraan harga berdasarkan yang kamu ceritakan.",
    detail: "Biasanya ada balasan dalam beberapa jam pada jam kerja.",
  },
  {
    n: "03",
    title: "Setujui dulu, baru dikerjakan",
    body: "Kamu lihat nama tukangnya, pengalaman, penilaian pemilik rumah lain, dan harganya. Kalau cocok, tinggal setujui. Kalau tidak, batalkan tanpa biaya.",
    detail: "Harga material dibicarakan di tahap ini, bukan setelah pekerjaan jalan.",
  },
  {
    n: "04",
    title: "Bayar setelah beres",
    body: "Tukang datang sesuai jadwal dan mengerjakan. Pembayaran dilakukan langsung ke tukangnya setelah pekerjaan selesai dan kamu puas.",
    detail: "Beresin tidak memotong pembayaran kamu.",
  },
];

const promises = [
  { title: "Identitas diperiksa", body: "KTP, alamat, dan riwayat pekerjaan dicek sebelum seorang tukang bisa menerima pesanan." },
  { title: "Harga sebelum kerja", body: "Tidak ada pekerjaan yang dimulai sebelum angkanya kamu setujui secara tertulis di aplikasi." },
  { title: "Penilaian jujur", body: "Rating hanya bisa diisi pemilik rumah yang pesanannya benar-benar selesai." },
  { title: "Gratis untuk pemilik rumah", body: "Memakai Beresin tidak dipungut biaya. Kami mengenakan biaya ke sisi tukang." },
];

export default function CaraKerjaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="eyebrow">Untuk pemilik rumah</p>
      <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        Cara kerja Beresin
      </h1>
      <p className="mt-3 text-lg text-steel">
        Empat langkah dari keluhan sampai selesai. Tidak ada biaya di muka, dan
        tidak ada pekerjaan yang jalan sebelum harganya kamu setujui.
      </p>

      <ol className="mt-9 flex flex-col gap-4">
        {steps.map((s) => (
          <li key={s.n} className="card p-6">
            <div className="grid gap-3 sm:grid-cols-[56px_1fr] sm:gap-5">
              <span className="tnum text-xl font-extrabold text-hivis">{s.n}</span>
              <div>
                <h2 className="text-lg font-bold">{s.title}</h2>
                <p className="mt-2 text-steel">{s.body}</p>
                <p className="mt-3 border-l-2 border-line pl-3 text-sm text-steel">{s.detail}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold tracking-tight">Yang kami jamin</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {promises.map((p) => (
            <div key={p.title} className="card p-5">
              <dt className="font-bold">{p.title}</dt>
              <dd className="mt-1.5 text-sm text-steel">{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-12 rounded-2xl bg-night p-7 text-paper">
        <h2 className="text-xl font-extrabold tracking-tight">Ada yang perlu dibereskan?</h2>
        <p className="mt-2 text-paper/70">
          Tulis keluhannya sekarang. Belum ada komitmen apa pun sampai kamu
          setuju dengan harganya.
        </p>
        <Link href="/buat-pesanan" className="btn btn-primary mt-5">
          Pesan tukang
        </Link>
      </div>
    </div>
  );
}
