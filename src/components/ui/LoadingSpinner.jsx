
export default function LoadingSpinner({
  message = "Loading...",
}) {
  return (
    <div className="w-full min-h-[calc(100vh-58px)] bg-[#f1f5f9] px-6 py-8">

      {/* Loading Animation */}
      <div className="flex flex-col items-center justify-center pt-1">
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#e5faff] shadow-[0_15px_35px_rgba(6,182,212,0.18)]">
          <div className="absolute inset-0 animate-spin rounded-full border-[4px] border-transparent border-t-cyan-500" />

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-2xl text-white shadow-lg">
            ✦
          </div>
        </div>

        <h2 className="text-xl font-semibold text-slate-600">
          Koda Dashboard
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          {message}
        </p>
      </div>

      {/* Skeleton Cards */}
      <div className="mx-auto mt-10 w-full max-w-[780px] animate-pulse">
        <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/10">
          <div className="h-5 w-40 rounded-full bg-slate-200" />
          <div className="mt-4 h-10 w-72 max-w-full rounded-xl bg-slate-200" />
          <div className="mt-3 h-4 w-56 rounded-full bg-slate-200" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/10"
            >
              <div className="h-5 w-24 rounded-full bg-slate-200" />
              <div className="mt-5 h-10 w-28 rounded-xl bg-slate-200" />
              <div className="mt-4 h-4 w-32 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
