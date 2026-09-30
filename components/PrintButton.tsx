"use client";

export default function PrintButton({ label = "Drucken" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center rounded-[2px] border border-ink px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper print:hidden"
    >
      {label}
    </button>
  );
}
