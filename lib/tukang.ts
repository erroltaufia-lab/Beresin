/**
 * Sample verified tradespeople. Demo data for the rebuild — the original
 * roster was not recovered. Replace with a real `Tukang` table when the
 * database goes in.
 */

export type Tukang = {
  id: string;
  name: string;
  /** Service slugs this person covers. */
  skills: string[];
  /** Neighbourhood within Tangerang Selatan. */
  area: string;
  yearsExperience: number;
  rating: number;
  jobsDone: number;
  /** Shown on the verification badge. */
  verifiedOn: string;
  note: string;
};

export const tukang: Tukang[] = [
  {
    id: "tk-anwar",
    name: "Pak Anwar",
    skills: ["ac", "listrik"],
    area: "Ciputat",
    yearsExperience: 12,
    rating: 4.9,
    jobsDone: 318,
    verifiedOn: "Maret 2026",
    note: "Spesialis AC split, bawa alat cuci sendiri.",
  },
  {
    id: "tk-supri",
    name: "Pak Supri",
    skills: ["ledeng", "lainnya"],
    area: "Pamulang",
    yearsExperience: 17,
    rating: 4.8,
    jobsDone: 402,
    verifiedOn: "Januari 2026",
    note: "Biasa menangani pompa dan saluran mampet.",
  },
  {
    id: "tk-dedi",
    name: "Pak Dedi",
    skills: ["listrik", "ac"],
    area: "Serpong",
    yearsExperience: 9,
    rating: 4.7,
    jobsDone: 205,
    verifiedOn: "April 2026",
    note: "Sertifikat instalasi listrik rumah tangga.",
  },
  {
    id: "tk-rahmat",
    name: "Pak Rahmat",
    skills: ["cat", "lainnya"],
    area: "Bintaro",
    yearsExperience: 14,
    rating: 4.8,
    jobsDone: 276,
    verifiedOn: "Februari 2026",
    note: "Tim dua orang untuk pengecatan ruangan.",
  },
  {
    id: "tk-yuni",
    name: "Bu Yuni",
    skills: ["kebersihan"],
    area: "Pondok Aren",
    yearsExperience: 7,
    rating: 4.9,
    jobsDone: 190,
    verifiedOn: "Mei 2026",
    note: "Deep cleaning dan cuci sofa, alat lengkap.",
  },
  {
    id: "tk-joko",
    name: "Pak Joko",
    skills: ["ledeng", "listrik", "lainnya"],
    area: "Ciputat Timur",
    yearsExperience: 21,
    rating: 4.6,
    jobsDone: 512,
    verifiedOn: "Desember 2025",
    note: "Serabutan berpengalaman, cocok untuk perbaikan kecil.",
  },
];

export function tukangFor(slug: string): Tukang[] {
  return tukang.filter((t) => t.skills.includes(slug));
}

export function getTukang(id: string): Tukang | undefined {
  return tukang.find((t) => t.id === id);
}
