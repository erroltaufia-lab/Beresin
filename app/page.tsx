import Link from "next/link";
import { services, CITY } from "@/lib/services";
import { tukang } from "@/lib/tukang";
import { rupiahRange } from "@/lib/format";
import VerifiedBadge from "@/components/VerifiedBadge";

const steps = [
  {
    n: "1",
    title: "Ceritakan masalahnya",
    body: "Pilih layanan, tulis keluhannya, tentukan kapan mau dikunjungi. Dua menit selesai.",
  },
  {
    n: "2",
    title: "Terima harga dulu",
    body: "Tukang terverifikasi terdekat mengirim penawaran. Tidak ada kerja sebelum harga disepakati.",
  },
  {
    n: "3",
    title: "Beres, baru bayar",
    body: "Bayar setelah pekerjaan selesai dan kamu puas. Langsung ke tukangnya.",
  },
];

export default function Home() {
  const totalJobs = tukang.reduce((sum, t) => sum + t.jobsDone, 0);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <p className="eyebrow">Melayani {CITY}</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            Cari tukang yang{" "}
            <span className="text-hivis">benar-benar datang</span>.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-steel">
            AC bocor, saluran mampet, listrik turun terus. Pesan tukang
            terverifikasi di {CITY}, lihat kisaran harganya dulu, baru
            putuskan.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/buat-pesanan" className="btn btn-primary">
              Pesan tukang sekarang
            </Link>
            <Link href="/cara-kerja" className="btn btn-ghost">
              Lihat cara kerjanya
            </Link>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
            <div>
              <dt className="text-xs text-steel">Tukang terverifikasi</dt>
              <dd className="tnum mt-1 text-2xl font-extrabold">{tukang.length}</dd>
            </div>
            <div>
              <dt className="text-xs text-steel">Pekerjaan selesai</dt>
              <dd className="tnum mt-1 text-2xl font-extrabold">{totalJobs.toLocaleString("id-ID")}</dd>
            </div>
            <div>
              <dt className="text-xs text-steel">Biaya pakai Beresin</dt>
              <dd className="mt-1 text-2xl font-extrabold text-verified">Gratis</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Layanan</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Harga terbuka sejak awal
            </h2>
          </div>
          <p className="max-w-sm text-sm text-steel">
            Kisaran di bawah adalah harga jasa yang biasa berlaku di {CITY}.
            Material dihitung terpisah.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/layanan/${s.slug}`}
                className="card flex h-full flex-col p-5 transition hover:border-line-firm"
              >
                <h3 className="text-lg font-bold">{s.name}</h3>
                <p className="mt-1.5 flex-1 text-sm text-steel">{s.blurb}</p>
                <p className="tnum mt-4 text-sm font-bold">{rupiahRange(s.min, s.max)}</p>
                <span className="mt-1 text-xs font-semibold text-hivis">
                  Lihat rincian harga →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-night text-paper">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <p className="eyebrow text-paper/60">Cara kerja</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Tiga langkah, tanpa biaya di muka
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="border-t-2 border-hivis pt-4">
                <span className="tnum text-sm font-bold text-hivis">{s.n}</span>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-paper/70">{s.body}</p>
              </li>
            ))}
          </ol>
          <Link href="/buat-pesanan" className="btn btn-primary mt-9">
            Mulai pesanan
          </Link>
        </div>
      </section>

      {/* Tukang */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <p className="eyebrow">Siapa yang datang</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Tukang yang sudah kami periksa
        </h2>
        <p className="mt-3 max-w-xl text-sm text-steel">
          Kami cek KTP, pengalaman, dan referensi pekerjaan sebelum seseorang
          bisa menerima pesanan. Penilaian datang dari pemilik rumah di {CITY}.
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tukang.map((t) => (
            <li key={t.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold">{t.name}</h3>
                  <p className="text-sm text-steel">{t.area}</p>
                </div>
                <span className="tnum rounded-lg bg-sunk px-2 py-1 text-sm font-bold">
                  {t.rating.toFixed(1)}
                </span>
              </div>
              <p className="mt-3 text-sm text-steel">{t.note}</p>
              <p className="tnum mt-3 text-xs text-steel">
                {t.yearsExperience} tahun pengalaman · {t.jobsDone} pekerjaan
              </p>
              <div className="mt-3">
                <VerifiedBadge since={t.verifiedOn} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
