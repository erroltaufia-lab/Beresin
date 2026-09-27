export default function VerifiedBadge({ since }: { since?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-verified">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M8 1l1.9 1.4 2.3-.2.7 2.2 1.9 1.3-1 2.1 1 2.1-1.9 1.3-.7 2.2-2.3-.2L8 15l-1.9-1.4-2.3.2-.7-2.2L1.2 10l1-2.1-1-2.1 1.9-1.3.7-2.2 2.3.2z"
          fill="currentColor"
        />
        <path d="M5.5 8.2l1.8 1.8 3.4-3.6" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Terverifikasi{since ? ` · ${since}` : ""}
    </span>
  );
}
