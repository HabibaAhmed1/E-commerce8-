
export default function Settings() {

  return (
    <main className="min-h-screen w-full bg-[var(--bg-app)] p-6 sm:p-8">
      <section className="w-full rounded-[26px] border border-[var(--border-app)] bg-[var(--bg-surface)] px-6 py-7 shadow-[var(--shadow-lg)]">

        <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-cyan-500)]">
          SETTINGS
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Preferences and integrations
        </h1>

        <p className="mt-2 text-base text-[var(--text-secondary)]">
          Theme mode, API credentials, and dashboard preferences are managed here.
        </p>

      </section>
    </main>
  );
}