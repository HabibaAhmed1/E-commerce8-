import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        user={user}
        onLogout={onLogout}
      />

      <div className="md:ml-64 flex flex-col min-h-screen">
        <header className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
          <button
            onClick={() => setOpen(true)}
            className="md:hidden px-3 py-1 rounded-lg bg-slate-800"
            aria-label="Open menu"
          >
            ☰
          </button>
          <img src="/logo.png" alt="Koda Store" className="h-10" />
          <div>
            <p className="font-semibold">Koda Dashboard</p>
            <p className="text-xs text-slate-400">E-Commerce Admin Panel</p>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}