"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({ user }: { user: { email: string } }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/auth/login");
  }

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md flex justify-between items-center shadow">
      <div className="text-lg font-bold text-white">Bandroom CMS</div>

      <div className="relative flex items-center gap-2 text-sm text-white">
        <span>{user.email}</span>

        <button
          onClick={() => setOpen(!open)}
          className="hover:opacity-80 p-1 rounded focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 mt-10 w-32 bg-white text-black shadow-lg rounded z-10">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-zinc-100 text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
