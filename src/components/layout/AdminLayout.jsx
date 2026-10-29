import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar"; 
import Navbar from "./Navbar";
import LogoutModal from "./LogoutModal"; 

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); 
  const navigate = useNavigate();

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

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    navigate("/logout"); 
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <SideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenLogoutModal={() => setIsLogoutModalOpen(true)} 
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
          onToggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          onOpenLogoutModal={() => setIsLogoutModalOpen(true)} 
        />

        <main className="flex-1 bg-gray-50 p-4 transition-colors sm:p-6 dark:bg-gray-800">
          <Outlet />
        </main>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
