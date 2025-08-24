export default function Badge({ label, value }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1 text-sm font-medium shadow-card ring-1 ring-zinc-200/60 dark:bg-zinc-900 dark:ring-zinc-800">
      <span className="text-zinc-500 dark:text-zinc-400">{label}:</span>
      <span className="text-zinc-900 dark:text-zinc-100">{value}</span>
    </div>
  )
}
