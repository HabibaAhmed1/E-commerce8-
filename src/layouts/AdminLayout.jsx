import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  Users,
  Package,
  Plus,
  FileText,
  ShoppingCart,
  Settings,
  X,
} from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/dashboard/users", label: "Users", icon: Users },
  { to: "/dashboard/products", label: "Products", icon: Package },
  { to: "/dashboard/products/new", label: "Add Product", icon: Plus },
  { to: "/dashboard/orders", label: "Orders", icon: FileText },
  { to: "/dashboard/carts", label: "Carts", icon: ShoppingCart },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-[family-name:var(--font-sans)]">
      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar - مطابق تماماً للصورة */}
      <aside
        className={
          "fixed top-0 left-0 z-40 h-full w-[var(--sidebar-width)] flex flex-col p-[var(--padding-sidebar)] bg-[var(--bg-sidebar)] border-r border-[var(--border-app)] backdrop-blur-[var(--backdrop-blur)] transition-transform duration-300 md:translate-x-0 " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        {/* Header: Commerce & Admin Panel */}
        <div className="mb-[var(--spacing-6)] flex items-center justify-between">
          <div>
            <p className="text-[var(--font-size-xs)] uppercase tracking-[var(--tracking-kicker)] text-[var(--color-cyan-400)] font-[var(--font-weight-semibold)]">
              Commerce
            </p>
            <h2 className="mt-[var(--spacing-1)] text-[var(--font-size-xl)] font-[var(--font-weight-bold)] text-[var(--text-primary)]">
              Admin Panel
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-[var(--radius-xl)] p-[var(--spacing-2)] hover:bg-[var(--nav-hover-bg)] text-[var(--text-secondary)] md:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-[var(--spacing-1)] overflow-y-auto">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                "flex items-center gap-[var(--spacing-3)] rounded-[var(--radius-2xl)] px-[var(--padding-nav-x)] py-[var(--padding-nav-y)] text-[var(--font-size-sm)] font-[var(--font-weight-medium)] transition " +
                (isActive
                  ? "bg-[var(--nav-active-bg)] text-white shadow-sm"
                  : "text-[var(--text-secondary)] hover:bg-[var(--nav-hover-bg)] hover:text-[var(--text-primary)]")
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Card (LIVE) */}
        <div className="mt-auto rounded-[var(--radius-3xl)] bg-[image:var(--gradient-brand)] p-[var(--padding-subcard)] text-white shadow-xl shadow-cyan-900/20">
          <p className="text-[var(--font-size-xs)] uppercase tracking-[var(--tracking-kicker)] text-white/80 font-[var(--font-weight-medium)]">
            Live
          </p>
          <p className="mt-[var(--spacing-2)] text-[var(--font-size-sm)] font-[var(--font-weight-semibold)]">
            Connected to the E-commerce API
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="md:ml-[var(--sidebar-width)] flex flex-col min-h-screen">
        {/* Header - كما كان سابقا */}
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

        <main className="flex-1 p-[var(--padding-subcard)] md:p-[var(--padding-card)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
