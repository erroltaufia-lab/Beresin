"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadSession, type Session } from "@/lib/store";
import Logo from "./Logo";

const nav = [
  { href: "/layanan/ac", label: "Layanan" },
  { href: "/cara-kerja", label: "Cara Kerja" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [session, setSession] = useState<Session>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => setSession(loadSession()), []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Beresin, beranda">
          <Logo className="h-7 w-7" />
          <span className="text-lg font-extrabold tracking-tight">Beresin</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-steel hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={session ? "/beranda" : "/masuk"} className="btn btn-ghost btn-sm">
            {session ? "Pesanan Saya" : "Masuk"}
          </Link>
          <Link href="/buat-pesanan" className="btn btn-primary btn-sm">
            Pesan Tukang
          </Link>
          <button
            type="button"
            className="btn btn-ghost btn-sm sm:hidden"
            aria-expanded={open}
            aria-label="Buka menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-line px-4 py-3 sm:hidden">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-2 py-2 text-sm font-medium text-steel hover:bg-sunk hover:text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
