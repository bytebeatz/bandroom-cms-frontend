"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

interface NavBarProps {
  email: string;
}

export default function NavBar({ email }: NavBarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "DELETE" });
    router.push("/auth/login");
  };

  if (!mounted) return null;

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-lg font-semibold">Admin Panel</h1>
      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button with Icon */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <SunIcon className="w-5 h-5 text-yellow-400" />
          ) : (
            <MoonIcon className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {/* Email Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-2 text-sm hover:opacity-80"
          >
            <span>{email}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black dark:bg-gray-800 dark:text-white shadow rounded z-10">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
