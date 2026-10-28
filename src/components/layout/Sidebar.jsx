
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  UserRound,
  UserRoundPen,
  LogOut,
  ChevronUp,
} from "lucide-react";


const mockUser = {
  name: "Admin User",
  role: "Administrator",
  image: null,
};

export default function Sidebar({
  isOpen,
  onClose,
  user = mockUser,
  onOpenLogoutModal,
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/dashboard/users" },
    { name: "Products", path: "/dashboard/products" },
    { name: "Add Product", path: "/dashboard/products/new" },
    { name: "Orders", path: "/dashboard/orders" },
    { name: "Carts", path: "/dashboard/carts" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <>
     
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside

        className={`
          fixed inset-y-0 left-0 z-50
          flex h-screen w-64 shrink-0 flex-col
          overflow-y-auto border-r border-gray-700
          bg-gray-900 p-4 text-white shadow-sm
          transition-colors duration-300
          md:sticky md:top-0 md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}

      >
     
        <h2 className="mb-8 shrink-0 text-xl font-bold">
          Admin Panel
        </h2>

       
        <nav className="flex shrink-0 flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/dashboard"}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 transition-colors ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

       
        <div
          ref={userMenuRef}
          className="relative mt-auto shrink-0 border-t border-gray-700 pt-4"
        >
         
          {isUserMenuOpen && (

            <div
              className="absolute bottom-full left-0 right-0 z-[60] mb-2 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-800"
              role="menu"
              aria-label="User menu"
            >

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onClose?.();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"              >
                <UserRound size={18} />
                <span>View Profile</span>
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onClose?.();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <UserRoundPen size={18} />
                <span>Edit Profile</span>
              </button>

              <div className="my-1 border-t border-gray-200 dark:border-gray-700" />

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onOpenLogoutModal?.();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            aria-expanded={isUserMenuOpen}
            aria-haspopup="menu"
            aria-label="Toggle user menu"
            className="flex w-full min-w-0 items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-blue-700">
              {user.image ? (
                <img
                  src={user.image}
                  alt={`${user.name}'s avatar`}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <UserRound size={22} />
              )}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">
                {user.name}
              </span>
              <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
                {user.role}
              </span>
            </span>

            <ChevronUp
              size={16}
              className={`shrink-0 text-gray-400 transition-transform ${isUserMenuOpen ? "rotate-180" : ""
                }`}
            />
          </button>
        </div>

      </aside>
    </>
  );
}
