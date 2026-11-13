
import {
  LayoutDashboard,
  Bell,
  Moon,
  UserRound,
  LogOut,
  Menu,
  Sun,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Navbar({
  onMenuClick,
  onToggleDarkMode,
  isDarkMode,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 transition-colors md:px-6 dark:border-gray-800 dark:bg-gray-900">

      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white sm:flex">
            <LayoutDashboard size={22} />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-gray-800 dark:text-gray-100">
              Admin Dashboard
            </h1>
            <p className="hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
              Welcome to Koda Store
            </p>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={isDarkMode ? "Light mode" : "Dark mode"}
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          type="button"
          aria-label="User profile"
          title="Profile"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <UserRound size={21} strokeWidth={2} />
          </span>
          <span className="hidden text-sm font-medium md:inline">
            Profile
          </span>
        </button>

        <button
          type="button"
          aria-label="Logout"
          title="Logout"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
        >
          <LogOut size={21} strokeWidth={2} />
          <span className="hidden text-sm font-medium lg:inline">
            Logout
          </span>
        </button>
      </div>
    </header>
  );
}
