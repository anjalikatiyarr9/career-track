
export default function Stats({ title, value, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-800">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-400">
        {description}
      </p>

      <div className="mt-4 h-1 w-12 rounded-full bg-slate-300"></div>
    </div>
  );
}
