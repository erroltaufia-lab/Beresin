import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services, CITY } from "@/lib/services";
import { tukangFor } from "@/lib/tukang";
import { rupiah, rupiahRange } from "@/lib/format";
import VerifiedBadge from "@/components/VerifiedBadge";

/**
 * The SEO template. Title format is taken verbatim from the original app:
 * "Biaya {service} di {city} {year}: Rp… – Rp… | Beresin"
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Layanan tidak ditemukan | Beresin" };
  const title = `Biaya ${service.name} di ${CITY} 2026: ${rupiahRange(service.min, service.max)} | Beresin`;
  return {
    title,
    description: `${service.blurb} Kisaran harga jasa ${service.name.toLowerCase()} di ${CITY} tahun 2026, plus apa saja yang mempengaruhi biayanya.`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crew = tukangFor(service.slug);
  const others = services.filter((s) => s.slug !== service.slug);
  const typical = Math.round((service.min + service.max) / 2 / 5000) * 5000;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="text-sm text-steel">
        <Link href="/" className="hover:text-ink">Beranda</Link>
        <span className="px-2">/</span>
        <span className="text-ink">{service.name}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        Biaya {service.name} di {CITY}
      </h1>
      <p className="mt-3 text-lg text-steel">{service.blurb}</p>

      {/* Price band */}
      <div className="card mt-7 p-6">
        <p className="eyebrow">Kisaran harga jasa 2026</p>
        <p className="tnum mt-2 text-3xl font-extrabold">
          {rupiah(service.min)} <span className="text-steel">–</span> {rupiah(service.max)}
        </p>
        <p className="tnum mt-2 text-sm text-steel">
          Paling sering jatuh di sekitar {rupiah(typical)} untuk satu kunjungan.
        </p>
        <p className="mt-4 border-t border-line pt-4 text-sm text-steel">
          Angka di atas adalah ongkos jasa. Material seperti freon, pipa, atau
          cat dihitung terpisah dan disepakati sebelum tukang mulai bekerja.
        </p>
        <Link href={`/buat-pesanan?layanan=${service.slug}`} className="btn btn-primary mt-5 w-full sm:w-auto">
          Pesan {service.name}
        </Link>
      </div>

      {/* Common jobs */}
      <section className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">
          Yang biasa dikerjakan
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {service.jobs.map((job) => (
            <li key={job} className="card flex items-start gap-2.5 p-4 text-sm">
              <span className="mt-0.5 text-hivis" aria-hidden="true">✦</span>
              <span>{job}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Price factors */}
      <section className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">
          Kenapa harganya bisa berbeda
        </h2>
        <dl className="mt-4 divide-y divide-line border-y border-line">
          {service.factors.map((f) => (
            <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
              <dt className="font-semibold">{f.label}</dt>
              <dd className="text-sm text-steel">{f.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Crew */}
      {crew.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-extrabold tracking-tight">
            Tukang {service.short.toLowerCase()} di {CITY}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {crew.map((t) => (
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
                <div className="mt-3"><VerifiedBadge since={t.verifiedOn} /></div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Other services */}
      <section className="mt-10 border-t border-line pt-8">
        <h2 className="eyebrow">Layanan lain</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/layanan/${s.slug}`}
                className="inline-block rounded-full border border-line-firm px-3.5 py-1.5 text-sm font-medium hover:border-ink"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
