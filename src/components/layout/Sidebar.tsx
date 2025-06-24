"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { name: "Analytics", href: "/dashboard/analytics" },
  { name: "Syllabus", href: "/dashboard/syllabus" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`bg-gray-900 text-white h-screen p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Arrow toggle positioning */}
      <div
        className={`flex items-center h-12 ${
          isOpen ? "justify-start" : "justify-center"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-gray-400 hover:text-white transition ${
            isOpen ? "ml-3" : ""
          }`}
        >
          {isOpen ? "⏴" : "⏵"}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-2 mt-4">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`w-full rounded px-4 py-2 transition-colors duration-200 
                ${isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}
              `}
            >
              <div
                className={`flex items-center ${
                  isOpen ? "justify-start" : "justify-center"
                }`}
              >
                {isOpen ? link.name : link.name.charAt(0)}
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
