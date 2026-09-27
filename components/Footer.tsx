import Link from "next/link";
import { services, CITY } from "@/lib/services";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-sunk">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Logo className="h-6 w-6" />
              <span className="font-extrabold tracking-tight">Beresin</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-steel">
              Pesan tukang terverifikasi di {CITY}. Harga disepakati sebelum
              kerja dimulai.
            </p>
          </div>

          <div>
            <h2 className="eyebrow">Layanan</h2>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/layanan/${s.slug}`} className="text-steel hover:text-ink">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow">Bantuan</h2>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li><Link href="/cara-kerja" className="text-steel hover:text-ink">Cara Kerja</Link></li>
              <li><Link href="/faq" className="text-steel hover:text-ink">Pertanyaan Umum</Link></li>
              <li><Link href="/buat-pesanan" className="text-steel hover:text-ink">Pesan Tukang</Link></li>
              <li><Link href="/beranda" className="text-steel hover:text-ink">Pesanan Saya</Link></li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs text-steel">
          © 2026 Beresin · Melayani {CITY} · Dibangun ulang 27 September 2026
        </p>
      </div>
    </footer>
  );
}
