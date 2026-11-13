
export default function FullPageLoader() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden border-t-4 border-[#55327b] bg-[#f8fafc]">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-200/30 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-200/30 blur-[100px]" />

      {/* Spinner */}
      <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-200">
        <div className="absolute inset-1 animate-spin rounded-full border-4 border-transparent border-b-cyan-500 border-l-cyan-500" />

        <div className="h-[55px] w-[55px] rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md" />
      </div>

      {/* Text */}
      <div className="text-center">
        <h2 className="mb-2 text-[23px] font-bold tracking-tight text-slate-800">
          Loading Session
        </h2>

        <p className="text-sm text-slate-500">
          Verifying authentication...
        </p>
      </div>

      {/* Animated Dots */}
      <div className="mt-1 flex items-center gap-2">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="h-3 w-3 animate-bounce rounded-full bg-cyan-500"
            style={{ animationDelay: `${dot * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
