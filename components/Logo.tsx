/** Beresin mark: a checkmark cut from a square, i.e. the job marked done. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Beresin">
      <rect width="32" height="32" rx="8" fill="#17191c" />
      <path
        d="M9 16.5l4.6 4.6L23 11.7"
        fill="none"
        stroke="#e4572e"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
