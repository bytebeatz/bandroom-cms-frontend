"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "🏠" },
  { label: "Courses", href: "/dashboard/courses", icon: "📚" },
  { label: "Skills", href: "/dashboard/skills", icon: "🎯" },
  { label: "Lessons", href: "/dashboard/lessons", icon: "🎵" },
];

export default function Sidebar({ user }: { user: { email: string } }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/auth/login");
  }

  return (
    <aside className="h-screen w-64 bg-zinc-950 text-white flex flex-col border-r border-zinc-800">
      <div className="px-6 py-4 text-2xl font-bold">Admin</div>

      <nav className="flex-1 px-4 space-y-1">
        <p className="text-xs uppercase text-zinc-400 px-2 mt-4">Navigation</p>
        {navItems.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-800 transition"
          >
            <span>{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-zinc-800 px-4 py-4 space-y-2 text-sm">
        <p className="text-zinc-400">Account</p>
        <div className="flex items-center justify-between">
          <span>{user.email}</span>
          <button
            onClick={() => setOpen(!open)}
            className="text-white hover:opacity-80"
          >
            ⌄
          </button>
        </div>

        {open && (
          <button
            onClick={handleLogout}
            className="w-full text-left mt-2 px-3 py-2 bg-zinc-800 rounded hover:bg-zinc-700"
          >
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}
