"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadSession, saveSession } from "@/lib/store";

export default function MasukPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const existing = loadSession();
    if (existing) {
      setName(existing.name);
      setPhone(existing.phone);
    }
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) {
      setError("Tulis nama kamu dulu ya.");
      return;
    }
    if (digits.length < 9) {
      setError("Nomor WhatsApp-nya sepertinya kurang lengkap.");
      return;
    }
    saveSession({ name: name.trim(), phone: phone.trim() });
    router.push("/beranda");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <h1 className="text-3xl font-extrabold tracking-tight">Masuk</h1>
      <p className="mt-2 text-steel">
        Cukup nama dan nomor WhatsApp. Dipakai supaya tukang bisa menghubungi
        kamu soal pesanannya.
      </p>

      <form onSubmit={submit} className="card mt-7 flex flex-col gap-5 p-6" noValidate>
        <div>
          <label className="label" htmlFor="masuk-nama">Nama</label>
          <input
            id="masuk-nama"
            className="field"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(null); }}
            placeholder="Nama panggilan saja cukup"
            autoComplete="name"
          />
        </div>

        <div>
          <label className="label" htmlFor="masuk-nomor">Nomor WhatsApp</label>
          <input
            id="masuk-nomor"
            className="field tnum"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setError(null); }}
            placeholder="0812 3456 7890"
            inputMode="tel"
            autoComplete="tel"
          />
        </div>

        {error ? (
          <p className="rounded-lg bg-sunk px-3 py-2 text-sm font-medium text-hivis-deep" role="alert">
            {error}
          </p>
        ) : null}

        <button type="submit" className="btn btn-primary w-full">Masuk</button>

        <p className="text-xs text-steel">
          Belum ada kata sandi di versi ini. Data kamu disimpan di browser ini
          saja dan tidak dikirim ke mana pun.
        </p>
      </form>

      <p className="mt-6 text-sm text-steel">
        Mau lihat-lihat dulu?{" "}
        <Link href="/cara-kerja" className="font-semibold text-ink hover:text-hivis">
          Baca cara kerjanya
        </Link>
      </p>
    </div>
  );
}
