
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDarkMode);

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <SideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          onToggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />

        <main className="flex-1 bg-gray-50 p-4 transition-colors sm:p-6 dark:bg-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
