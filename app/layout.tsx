import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Plus Jakarta Sans was commissioned as Jakarta's city typeface — the right
// voice for a Greater Jakarta home-services app.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Beresin — Pesan Tukang Terverifikasi di Tangerang Selatan",
  description:
    "Pesan tukang AC, ledeng, listrik, dan renovasi ringan di Tangerang Selatan. Semua tukang terverifikasi, harga disepakati di depan.",
};

export const viewport: Viewport = {
  themeColor: "#17191c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper font-sans text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
