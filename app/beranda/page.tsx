"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getService } from "@/lib/services";
import { rupiah, shortDate, longDate, timeLabel } from "@/lib/format";
import { loadOrders, loadSession, type Order, type Session } from "@/lib/store";
import StatusPill from "@/components/StatusPill";

export default function BerandaPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [session, setSession] = useState<Session>(null);

  useEffect(() => {
    setOrders(loadOrders());
    setSession(loadSession());
  }, []);

  if (orders === null) {
    return <div className="mx-auto max-w-3xl px-4 py-14 text-steel">Memuat pesanan…</div>;
  }

  const active = orders.filter((o) => o.status !== "selesai");
  const done = orders.filter((o) => o.status === "selesai");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Pesanan saya</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            {session ? `Halo, ${session.name}` : "Pesanan kamu"}
          </h1>
        </div>
        <Link href="/buat-pesanan" className="btn btn-primary btn-sm">Pesan lagi</Link>
      </div>

      {orders.length === 0 ? (
        <div className="card mt-8 p-8 text-center">
          <h2 className="text-lg font-bold">Belum ada pesanan</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-steel">
            Begitu kamu mengirim pesanan pertama, statusnya akan muncul di sini.
          </p>
          <Link href="/buat-pesanan" className="btn btn-primary mt-5">Pesan tukang</Link>
        </div>
      ) : null}

      {active.length > 0 ? (
        <section className="mt-8">
          <h2 className="eyebrow">Sedang berjalan</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {active.map((o) => <OrderRow key={o.id} order={o} />)}
          </ul>
        </section>
      ) : null}

      {done.length > 0 ? (
        <section className="mt-9">
          <h2 className="eyebrow">Riwayat</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {done.map((o) => <OrderRow key={o.id} order={o} />)}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  const service = getService(order.serviceSlug);
  return (
    <li>
      <Link href={`/pesanan/${order.id}`} className="card block p-5 transition hover:border-line-firm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-bold">{service?.name ?? order.serviceSlug}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-steel">{order.description}</p>
          </div>
          <StatusPill status={order.status} />
        </div>
        <div className="tnum mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-3 text-xs text-steel">
          <span>{longDate(order.preferredDate)}, {timeLabel(order.preferredTime).toLowerCase()}</span>
          <span>Dipesan {shortDate(order.createdAt)}</span>
          {order.quote !== null ? (
            <span className="font-semibold text-ink">{rupiah(order.quote)}</span>
          ) : null}
        </div>
      </Link>
    </li>
  );
}
