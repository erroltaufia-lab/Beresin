import { services } from "@/lib/services";

/** Prerenders every service page so the site can be exported statically. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
