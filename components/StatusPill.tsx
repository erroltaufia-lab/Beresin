import type { OrderStatus } from "@/lib/store";

const copy: Record<OrderStatus, string> = {
  menunggu: "Menunggu tukang",
  dijadwalkan: "Dijadwalkan",
  dikerjakan: "Sedang dikerjakan",
  selesai: "Selesai",
};

export default function StatusPill({ status }: { status: OrderStatus }) {
  return <span className={`pill pill-${status}`}>{copy[status]}</span>;
}
