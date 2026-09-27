"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { getService } from "@/lib/services";
import { getTukang } from "@/lib/tukang";
import { rupiah, rupiahRange, longDate, shortDate, timeLabel } from "@/lib/format";
import { acceptOrder, getOrder, type Order } from "@/lib/store";
import StatusPill from "@/components/StatusPill";
import VerifiedBadge from "@/components/VerifiedBadge";

const timeline: { status: Order["status"]; label: string }[] = [
  { status: "menunggu", label: "Pesanan dikirim" },
  { status: "dijadwalkan", label: "Harga disepakati" },
  { status: "dikerjakan", label: "Tukang datang" },
  { status: "selesai", label: "Selesai" },
];

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => setOrder(getOrder(id) ?? null), [id]);

  if (order === undefined) {
    return <div className="mx-auto max-w-2xl px-4 py-14 text-steel">Memuat pesanan…</div>;
  }

  if (order === null) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <h1 className="text-2xl font-extrabold tracking-tight">Pesanan tidak ditemukan</h1>
        <p className="mt-2 text-steel">
          Pesanan ini tidak ada di browser kamu. Pesanan disimpan per perangkat,
          jadi tautan dari perangkat lain tidak akan terbuka di sini.
        </p>
        <Link href="/beranda" className="btn btn-ghost mt-6">Lihat pesanan saya</Link>
      </div>
    );
  }

  const service = getService(order.serviceSlug);
  const worker = order.tukangId ? getTukang(order.tukangId) : null;
  const currentStep = timeline.findIndex((t) => t.status === order.status);

  function accept() {
    const updated = acceptOrder(id);
    if (updated) setOrder({ ...updated });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <nav className="text-sm text-steel">
        <Link href="/beranda" className="hover:text-ink">Pesanan saya</Link>
        <span className="px-2">/</span>
        <span className="text-ink">{service?.name ?? "Pesanan"}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {service?.name ?? "Pesanan"}
        </h1>
        <StatusPill status={order.status} />
      </div>
      <p className="tnum mt-1.5 text-xs text-steel">
        No. pesanan {order.id} · dibuat {shortDate(order.createdAt)}
      </p>

      {/* Timeline */}
      <ol className="mt-7 grid grid-cols-4 gap-1.5">
        {timeline.map((step, i) => {
          const reached = i <= currentStep;
          return (
            <li key={step.status}>
              <div className={`h-1 rounded-full ${reached ? "bg-hivis" : "bg-line"}`} />
              <p className={`mt-2 text-[11px] leading-tight ${reached ? "font-semibold text-ink" : "text-steel"}`}>
                {step.label}
              </p>
            </li>
          );
        })}
      </ol>

      {/* Waiting state */}
      {order.status === "menunggu" ? (
        <div className="card mt-7 p-6">
          <h2 className="text-lg font-bold">Menunggu tukang menerima</h2>
          <p className="mt-2 text-sm text-steel">
            Pesanan sudah diteruskan ke tukang terverifikasi di area kamu.
            Biasanya ada balasan dalam beberapa jam pada jam kerja. Kamu akan
            dihubungi lewat WhatsApp di {order.contactPhone}.
          </p>
          {service ? (
            <p className="tnum mt-3 text-sm text-steel">
              Perkiraan kasar untuk pekerjaan ini: {rupiahRange(service.min, service.max)}.
            </p>
          ) : null}
          <button type="button" onClick={accept} className="btn btn-dark btn-sm mt-5">
            Simulasikan tukang menerima
          </button>
          <p className="mt-2 text-xs text-steel">
            Tombol di atas hanya ada di versi demo, menggantikan aplikasi sisi tukang.
          </p>
        </div>
      ) : null}

      {/* Assigned tukang */}
      {worker ? (
        <div className="card mt-7 p-6">
          <p className="eyebrow">Tukang kamu</p>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">{worker.name}</h2>
              <p className="text-sm text-steel">
                {worker.area} · {worker.yearsExperience} tahun pengalaman
              </p>
              <div className="mt-2"><VerifiedBadge since={worker.verifiedOn} /></div>
            </div>
            <span className="tnum rounded-lg bg-sunk px-2.5 py-1.5 text-sm font-bold">
              {worker.rating.toFixed(1)}
            </span>
          </div>
          <p className="mt-3 text-sm text-steel">{worker.note}</p>
          {order.quote !== null ? (
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-4">
              <span className="text-sm text-steel">Harga jasa disepakati</span>
              <span className="tnum text-2xl font-extrabold">{rupiah(order.quote)}</span>
            </div>
          ) : null}
          <p className="mt-2 text-xs text-steel">
            Belum termasuk material. Pembayaran langsung ke tukang setelah selesai.
          </p>
        </div>
      ) : null}

      {/* Details */}
      <div className="card mt-4 p-6">
        <p className="eyebrow">Rincian pesanan</p>
        <dl className="mt-3 divide-y divide-line">
          <Row label="Keluhan" value={order.description} />
          <Row label="Alamat" value={order.address} />
          <Row
            label="Jadwal"
            value={`${longDate(order.preferredDate)}, ${timeLabel(order.preferredTime).toLowerCase()}`}
          />
          <Row label="Kontak" value={`${order.contactName} · ${order.contactPhone}`} />
        </dl>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/beranda" className="btn btn-ghost">Kembali ke pesanan</Link>
        <Link href="/buat-pesanan" className="btn btn-primary">Buat pesanan baru</Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[120px_1fr] sm:gap-5">
      <dt className="text-sm font-semibold">{label}</dt>
      <dd className="text-sm text-steel">{value}</dd>
    </div>
  );
}
