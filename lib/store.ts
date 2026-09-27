"use client";

/**
 * Orders and session, kept in localStorage.
 *
 * The original Beresin stored orders in a real database through Prisma — the
 * recovered order IDs are cuid values. This rebuild keeps the same URL shape
 * (/pesanan/[id]) but persists to the browser so the app runs with no backend
 * and can be exported as a static demo.
 *
 * To move to Prisma later: keep `Order`, replace the four functions at the
 * bottom with server actions, and drop ORDER_IDS.
 */

import { services } from "./services";
import { tukang } from "./tukang";
import { ORDER_IDS } from "./order-ids";

export { ORDER_IDS };

export type OrderStatus = "menunggu" | "dijadwalkan" | "dikerjakan" | "selesai";

export type Order = {
  id: string;
  serviceSlug: string;
  /** What the homeowner typed. */
  description: string;
  address: string;
  /** ISO date string for the requested visit. */
  preferredDate: string;
  /** "pagi" | "siang" | "sore" */
  preferredTime: string;
  contactName: string;
  contactPhone: string;
  status: OrderStatus;
  /** Assigned tradesperson id, null while status is "menunggu". */
  tukangId: string | null;
  /** Quoted price in rupiah, null until a tukang accepts. */
  quote: number | null;
  createdAt: string;
};

const ORDERS_KEY = "beresin-orders";
const SESSION_KEY = "beresin-session";


function seedOrders(): Order[] {
  const ac = services.find((s) => s.slug === "ac")!;
  const ledeng = services.find((s) => s.slug === "ledeng")!;
  return [
    {
      id: ORDER_IDS[0],
      serviceSlug: ac.slug,
      description:
        "AC kamar utama 1 PK sudah dua minggu tidak dingin, air menetes dari indoor.",
      address: "Jl. Cendrawasih Raya No. 14, Ciputat",
      preferredDate: isoDaysFromNow(1),
      preferredTime: "pagi",
      contactName: "Errol",
      contactPhone: "0812 3456 7890",
      status: "dijadwalkan",
      tukangId: tukang[0].id,
      quote: 285_000,
      createdAt: isoDaysFromNow(-1),
    },
    {
      id: ORDER_IDS[1],
      serviceSlug: ledeng.slug,
      description:
        "Saluran wastafel dapur mampet, air naik ke permukaan kalau dipakai cuci piring.",
      address: "Jl. Cendrawasih Raya No. 14, Ciputat",
      preferredDate: isoDaysFromNow(-3),
      preferredTime: "sore",
      contactName: "Errol",
      contactPhone: "0812 3456 7890",
      status: "selesai",
      tukangId: tukang[1].id,
      quote: 180_000,
      createdAt: isoDaysFromNow(-5),
    },
  ];
}

function isoDaysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(9, 0, 0, 0);
  return d.toISOString();
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private window or storage full — the app still works for this visit */
  }
}

export function loadOrders(): Order[] {
  const stored = read<Order[] | null>(ORDERS_KEY, null);
  if (stored && Array.isArray(stored)) return stored;
  const seeded = seedOrders();
  write(ORDERS_KEY, seeded);
  return seeded;
}

export function getOrder(id: string): Order | undefined {
  return loadOrders().find((o) => o.id === id);
}

export type NewOrder = Omit<
  Order,
  "id" | "status" | "tukangId" | "quote" | "createdAt"
>;

/** Creates an order against the next unused ID in the pool. */
export function createOrder(input: NewOrder): Order {
  const orders = loadOrders();
  const used = new Set(orders.map((o) => o.id));
  const id = ORDER_IDS.find((candidate) => !used.has(candidate)) ?? ORDER_IDS[0];
  const order: Order = {
    ...input,
    id,
    status: "menunggu",
    tukangId: null,
    quote: null,
    createdAt: new Date().toISOString(),
  };
  write(ORDERS_KEY, [order, ...orders.filter((o) => o.id !== id)]);
  return order;
}

/**
 * Demo stand-in for the tradesperson accepting a job. In the real app this
 * happens on the tukang side, not from the homeowner's browser.
 */
export function acceptOrder(id: string): Order | undefined {
  const orders = loadOrders();
  const order = orders.find((o) => o.id === id);
  if (!order || order.status !== "menunggu") return order;
  const service = services.find((s) => s.slug === order.serviceSlug);
  const candidates = tukang.filter((t) => t.skills.includes(order.serviceSlug));
  const chosen = candidates[0] ?? tukang[0];
  const mid = service ? Math.round((service.min + service.max) / 2 / 5000) * 5000 : 200_000;
  order.status = "dijadwalkan";
  order.tukangId = chosen.id;
  order.quote = mid;
  write(ORDERS_KEY, orders);
  return order;
}

export type Session = { name: string; phone: string } | null;

export function loadSession(): Session {
  return read<Session>(SESSION_KEY, null);
}

export function saveSession(session: Session): void {
  write(SESSION_KEY, session);
}
