import { ORDER_IDS } from "@/lib/order-ids";

/**
 * Every ID in the pool is prerendered, so a deep link to any order resolves
 * even on a static host with no server.
 */
export function generateStaticParams() {
  return ORDER_IDS.map((id) => ({ id }));
}

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
