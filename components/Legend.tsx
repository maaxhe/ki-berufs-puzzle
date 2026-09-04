/** Die zwei Pole, an denen im ganzen Tool sortiert wird. */
export default function Legend() {
  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-2 text-sm">
      <div className="flex items-baseline gap-2">
        <span className="relative top-[1px] h-3 w-3 shrink-0 bg-mensch" />
        <dt className="font-semibold text-ink">Mensch</dt>
        <dd className="text-ink-2">bleibt menschliche Arbeit</dd>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="relative top-[1px] h-3 w-3 shrink-0 bg-ki" />
        <dt className="font-semibold text-ink">Maschine</dt>
        <dd className="text-ink-2">kann KI heute übernehmen</dd>
      </div>
    </dl>
  );
}
