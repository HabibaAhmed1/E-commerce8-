import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/dashboard/products", label: "Products" },
  { to: "/dashboard/products/new", label: "Add Product" },
  { to: "/dashboard/orders", label: "Orders" },
  { to: "/dashboard/users", label: "Users" },
  { to: "/dashboard/carts", label: "Carts" },
];

export default function Sidebar({ open, onClose, user, onLogout }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={
          "fixed top-0 left-0 z-40 h-full w-64 flex flex-col p-5 bg-slate-900 border-r border-slate-800 text-white transition-transform md:translate-x-0 " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={onClose}
              className={({ isActive }) =>
                "block px-3 py-2 mb-1 rounded-lg text-sm " +
                (isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="pt-4 border-t border-slate-800">
          <p className="text-sm font-semibold">{user?.name}</p>
          <p className="text-xs text-slate-400 mb-3">{user?.email}</p>
          <p className="text-xs text-slate-500 mb-3">Role: {user?.role}</p>
          <button
            onClick={onLogout}
            className="w-full px-3 py-2 rounded-lg bg-red-500 text-sm hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}