/** Formatting helpers. Indonesian conventions throughout. */

/** 285000 -> "Rp285.000" */
export function rupiah(value: number): string {
  return "Rp" + value.toLocaleString("id-ID");
}

/** 75000, 450000 -> "Rp75.000 – Rp450.000" */
export function rupiahRange(min: number, max: number): string {
  return `${rupiah(min)} – ${rupiah(max)}`;
}

/** ISO string -> "Senin, 28 September" */
export function longDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** ISO string -> "28 Sep 2026" */
export function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const timeSlots: { value: string; label: string; hint: string }[] = [
  { value: "pagi", label: "Pagi", hint: "08.00 – 11.00" },
  { value: "siang", label: "Siang", hint: "11.00 – 15.00" },
  { value: "sore", label: "Sore", hint: "15.00 – 18.00" },
];

export function timeLabel(value: string): string {
  return timeSlots.find((s) => s.value === value)?.label ?? value;
}
