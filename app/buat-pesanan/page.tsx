"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { services, getService, CITY } from "@/lib/services";
import { rupiahRange, timeSlots, longDate, timeLabel } from "@/lib/format";
import { createOrder, loadSession, saveSession, type Order } from "@/lib/store";

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function BookingForm() {
  const params = useSearchParams();

  const [placed, setPlaced] = useState<Order | null>(null);
  const [slug, setSlug] = useState(services[0].slug);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(todayPlus(1));
  const [time, setTime] = useState(timeSlots[0].value);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const preset = params.get("layanan");
    if (preset && getService(preset)) setSlug(preset);
    const session = loadSession();
    if (session) {
      setName(session.name);
      setPhone(session.phone);
    }
  }, [params]);

  const service = getService(slug) ?? services[0];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (description.trim().length < 10) {
      setError("Ceritakan sedikit lebih jelas supaya tukang bisa memberi harga.");
      return;
    }
    if (address.trim().length < 6) {
      setError("Alamatnya belum lengkap.");
      return;
    }
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 9) {
      setError("Nama dan nomor WhatsApp perlu diisi supaya tukang bisa menghubungi.");
      return;
    }
    saveSession({ name: name.trim(), phone: phone.trim() });
    const order = createOrder({
      serviceSlug: service.slug,
      description: description.trim(),
      address: address.trim(),
      preferredDate: new Date(date + "T09:00:00").toISOString(),
      preferredTime: time,
      contactName: name.trim(),
      contactPhone: phone.trim(),
    });
    setPlaced(order);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed) {
    return <Confirmation order={placed} />;
  }

  return (
    <form onSubmit={submit} className="mt-8 flex flex-col gap-7" noValidate>
      {/* Service */}
      <fieldset>
        <legend className="label">Layanan yang dibutuhkan</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {services.map((s) => {
            const active = s.slug === service.slug;
            return (
              <label
                key={s.slug}
                className={`card flex cursor-pointer items-start gap-3 p-4 ${
                  active ? "border-hivis ring-1 ring-hivis" : "hover:border-line-firm"
                }`}
              >
                <input
                  type="radio"
                  name="layanan"
                  value={s.slug}
                  checked={active}
                  onChange={() => setSlug(s.slug)}
                  className="mt-1 accent-[#e4572e]"
                />
                <span>
                  <span className="block font-bold">{s.name}</span>
                  <span className="tnum block text-xs text-steel">
                    {rupiahRange(s.min, s.max)}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Description */}
      <div>
        <label className="label" htmlFor="keluhan">Apa yang perlu dibereskan?</label>
        <textarea
          id="keluhan"
          className="field min-h-28 resize-y"
          value={description}
          onChange={(e) => { setDescription(e.target.value); setError(null); }}
          placeholder="Contoh: AC kamar 1 PK tidak dingin sejak minggu lalu, ada air menetes dari indoor."
        />
        <p className="mt-1.5 text-xs text-steel">
          Tulis apa adanya. Tidak perlu istilah teknis.
        </p>
      </div>

      {/* Address */}
      <div>
        <label className="label" htmlFor="alamat">Alamat di {CITY}</label>
        <input
          id="alamat"
          className="field"
          value={address}
          onChange={(e) => { setAddress(e.target.value); setError(null); }}
          placeholder="Jl. Cendrawasih Raya No. 14, Ciputat"
          autoComplete="street-address"
        />
      </div>

      {/* Schedule */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="tanggal">Kapan mau dikunjungi</label>
          <input
            id="tanggal"
            type="date"
            className="field tnum"
            value={date}
            min={todayPlus(0)}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <fieldset>
          <legend className="label">Waktu</legend>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((s) => (
              <label
                key={s.value}
                className={`cursor-pointer rounded-lg border px-2 py-2.5 text-center ${
                  time === s.value
                    ? "border-hivis bg-card ring-1 ring-hivis"
                    : "border-line-firm bg-card hover:border-ink"
                }`}
              >
                <input
                  type="radio"
                  name="waktu"
                  value={s.value}
                  checked={time === s.value}
                  onChange={() => setTime(s.value)}
                  className="sr-only"
                />
                <span className="block text-sm font-semibold">{s.label}</span>
                <span className="tnum block text-[11px] text-steel">{s.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Contact */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="nama">Nama</label>
          <input
            id="nama"
            className="field"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(null); }}
            placeholder="Nama panggilan"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="label" htmlFor="nomor">Nomor WhatsApp</label>
          <input
            id="nomor"
            className="field tnum"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setError(null); }}
            placeholder="0812 3456 7890"
            inputMode="tel"
            autoComplete="tel"
          />
        </div>
      </div>

      {error ? (
        <p className="rounded-lg bg-sunk px-3 py-2.5 text-sm font-medium text-hivis-deep" role="alert">
          {error}
        </p>
      ) : null}

      <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-steel">
          Belum ada biaya. Kamu akan menerima penawaran harga dulu sebelum
          tukang mulai bekerja.
        </p>
        <button type="submit" className="btn btn-primary shrink-0">
          Kirim pesanan
        </button>
      </div>
    </form>
  );
}

function Confirmation({ order }: { order: Order }) {
  const service = getService(order.serviceSlug);
  return (
    <div className="card mt-8 p-7">
      <span className="pill pill-menunggu">Pesanan terkirim</span>
      <h2 className="mt-4 text-2xl font-extrabold tracking-tight">
        Sudah kami teruskan ke tukang
      </h2>
      <p className="mt-2 text-steel">
        Tukang terverifikasi di area kamu akan mengirim perkiraan harga. Kamu
        dihubungi lewat WhatsApp di {order.contactPhone}.
      </p>

      <dl className="mt-6 divide-y divide-line border-y border-line">
        <div className="grid gap-1 py-3 sm:grid-cols-[120px_1fr] sm:gap-5">
          <dt className="text-sm font-semibold">Layanan</dt>
          <dd className="text-sm text-steel">{service?.name ?? order.serviceSlug}</dd>
        </div>
        <div className="grid gap-1 py-3 sm:grid-cols-[120px_1fr] sm:gap-5">
          <dt className="text-sm font-semibold">Jadwal</dt>
          <dd className="text-sm text-steel">
            {longDate(order.preferredDate)}, {timeLabel(order.preferredTime).toLowerCase()}
          </dd>
        </div>
        <div className="grid gap-1 py-3 sm:grid-cols-[120px_1fr] sm:gap-5">
          <dt className="text-sm font-semibold">No. pesanan</dt>
          <dd className="tnum text-sm text-steel">{order.id}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/pesanan/${order.id}`} className="btn btn-primary">
          Lihat pesanan
        </Link>
        <Link href="/beranda" className="btn btn-ghost">Semua pesanan saya</Link>
      </div>
    </div>
  );
}

export default function BuatPesananPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <nav className="text-sm text-steel">
        <Link href="/" className="hover:text-ink">Beranda</Link>
        <span className="px-2">/</span>
        <span className="text-ink">Buat pesanan</span>
      </nav>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
        Ceritakan yang perlu dibereskan
      </h1>
      <p className="mt-2 text-steel">
        Sekitar dua menit. Setelah ini tukang terverifikasi di area kamu akan
        mengirim perkiraan harga.
      </p>

      <Suspense fallback={<p className="mt-8 text-steel">Memuat formulir…</p>}>
        <BookingForm />
      </Suspense>
    </div>
  );
}
