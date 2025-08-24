export default function Alert({ title, message }) {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-xl border border-red-300 bg-red-50 p-4 text-red-900 shadow-card dark:border-red-800/60 dark:bg-red-900/20 dark:text-red-200">
      <div className="font-semibold">{title}</div>
      <div className="text-sm opacity-80">{message}</div>
    </div>
  )
}
