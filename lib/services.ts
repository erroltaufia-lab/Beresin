/**
 * Service catalogue. Drives both the booking form and the SEO price pages
 * at /layanan/[slug].
 *
 * RECOVERED: the slugs `ac`, `ledeng` and `lainnya` and their price bands come
 * from the original app's page titles, captured in browser history on
 * 2026-07-17. Do not change those numbers without a reason.
 * NEW: `listrik`, `cat` and `kebersihan` were added during the 2026-09-27
 * rebuild. Their price bands are market estimates, not recovered data.
 */

export type Service = {
  slug: string;
  name: string;
  /** Short label used on chips and in the order summary. */
  short: string;
  /** Lowest typical job price, in rupiah. */
  min: number;
  /** Highest typical job price, in rupiah. */
  max: number;
  /** One line for cards and meta descriptions. */
  blurb: string;
  /** What a homeowner usually calls someone out for. */
  jobs: string[];
  /** What changes the price, shown as a list on the service page. */
  factors: { label: string; detail: string }[];
  recovered: boolean;
};

export const CITY = "Tangerang Selatan";

export const services: Service[] = [
  {
    slug: "ac",
    name: "Service AC",
    short: "AC",
    min: 75_000,
    max: 450_000,
    blurb:
      "Cuci AC, isi freon, perbaikan tidak dingin, sampai bongkar pasang unit.",
    jobs: [
      "Cuci AC rutin (split / standing)",
      "AC tidak dingin atau bocor air",
      "Isi ulang freon R32 / R410",
      "Bongkar pasang saat pindah rumah",
    ],
    factors: [
      { label: "Jumlah PK", detail: "Unit 1 PK lebih murah daripada 2 PK ke atas." },
      { label: "Jenis pekerjaan", detail: "Cuci rutin jauh di bawah isi freon atau bongkar pasang." },
      { label: "Ketinggian unit", detail: "Unit di lantai dua atau posisi sulit butuh tambahan alat." },
    ],
    recovered: true,
  },
  {
    slug: "ledeng",
    name: "Ledeng & Pipa",
    short: "Ledeng",
    min: 100_000,
    max: 500_000,
    blurb:
      "Keran bocor, saluran mampet, pompa air mati, sampai ganti jalur pipa.",
    jobs: [
      "Keran atau shower bocor",
      "Wastafel dan saluran mampet",
      "Pompa air tidak menyala",
      "Ganti jalur pipa yang pecah",
    ],
    factors: [
      { label: "Letak kebocoran", detail: "Pipa dalam dinding atau bawah lantai perlu pembongkaran." },
      { label: "Material", detail: "Harga belum termasuk pipa, fitting, atau unit pompa baru." },
      { label: "Waktu panggilan", detail: "Panggilan darurat malam hari dikenakan tambahan." },
    ],
    recovered: true,
  },
  {
    slug: "listrik",
    name: "Listrik",
    short: "Listrik",
    min: 80_000,
    max: 600_000,
    blurb:
      "Korsleting, tambah titik lampu, ganti MCB, dan pemasangan stop kontak.",
    jobs: [
      "Listrik sering turun atau korslet",
      "Tambah titik lampu atau stop kontak",
      "Ganti MCB dan box pembagi",
      "Pasang lampu taman dan sensor",
    ],
    factors: [
      { label: "Jumlah titik", detail: "Dihitung per titik pasang, makin banyak makin murah per titiknya." },
      { label: "Kondisi instalasi", detail: "Instalasi lama sering perlu penarikan kabel ulang." },
      { label: "Daya rumah", detail: "Penambahan beban besar mungkin perlu naik daya ke PLN." },
    ],
    recovered: false,
  },
  {
    slug: "cat",
    name: "Cat & Dinding",
    short: "Cat",
    min: 150_000,
    max: 900_000,
    blurb:
      "Cat ulang ruangan, tambal retak, anti bocor, dan perbaikan plafon.",
    jobs: [
      "Cat ulang kamar atau ruang tamu",
      "Tambal dinding retak dan berjamur",
      "Cat pelapis anti bocor untuk dak",
      "Perbaikan plafon gypsum",
    ],
    factors: [
      { label: "Luas bidang", detail: "Dihitung per meter persegi, bukan per ruangan." },
      { label: "Kondisi dinding", detail: "Dinding berjamur atau mengelupas perlu pengerokan dulu." },
      { label: "Cat disediakan siapa", detail: "Harga di sini jasa saja, cat biasanya dibeli pemilik rumah." },
    ],
    recovered: false,
  },
  {
    slug: "kebersihan",
    name: "Kebersihan",
    short: "Bersih",
    min: 120_000,
    max: 700_000,
    blurb:
      "Bersih menyeluruh rumah, cuci sofa dan kasur, sampai poles lantai.",
    jobs: [
      "Deep cleaning sebelum pindahan",
      "Cuci sofa, kasur, dan karpet",
      "Bersih kamar mandi berkerak",
      "Poles lantai marmer dan granit",
    ],
    factors: [
      { label: "Luas rumah", detail: "Dihitung dari jumlah kamar dan luas bangunan." },
      { label: "Tingkat kotoran", detail: "Rumah lama kosong butuh waktu jauh lebih lama." },
      { label: "Jumlah tenaga", detail: "Pekerjaan sehari selesai biasanya perlu dua orang." },
    ],
    recovered: false,
  },
  {
    slug: "lainnya",
    name: "Lainnya",
    short: "Lainnya",
    min: 50_000,
    max: 1_500_000,
    blurb:
      "Pekerjaan kecil sampai renovasi ringan yang tidak masuk kategori lain.",
    jobs: [
      "Pasang rak, gorden, dan TV dinding",
      "Perbaikan pintu dan kunci",
      "Pasang kanopi dan teralis",
      "Renovasi ringan kamar mandi",
    ],
    factors: [
      { label: "Ruang lingkup", detail: "Rentangnya lebar karena mencakup pekerjaan sangat kecil dan renovasi." },
      { label: "Survei dulu", detail: "Pekerjaan besar biasanya disurvei sebelum harga dikunci." },
      { label: "Material", detail: "Hampir selalu di luar harga jasa." },
    ],
    recovered: false,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
