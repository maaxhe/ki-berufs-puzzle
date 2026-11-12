"use client";

export default function PrintButton({ label = "Drucken" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center rounded-full border-2 border-ink px-4 py-2 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-paper print:hidden"
    >
      {label}
    </button>
  );
}
