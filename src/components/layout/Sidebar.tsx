"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLink = {
  name: string;
  href: string;
};

type NavSection = {
  title: string;
  links: NavLink[];
};

const sections: NavSection[] = [
  {
    title: "Management",
    links: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Analytics", href: "/dashboard/analytics" },
      { name: "Users", href: "/dashboard/users" },
    ],
  },
  {
    title: "Syllabus",
    links: [
      { name: "Create Course", href: "/dashboard/courses/new" },

      { name: "All Courses", href: "/dashboard/courses" },
      //      { name: "Units", href: "/dashboard/units" },
      //    { name: "Lessons", href: "/dashboard/lessons" },
    ],
  },
  {
    title: "Settings",
    links: [{ name: "Settings", href: "/dashboard/settings" }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`bg-gray-900 text-white min-h-screen p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Collapse Toggle */}
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

      {/* Sectioned Links */}
      <nav className="mt-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            {isOpen && (
              <div className="text-xs uppercase text-gray-500 mb-2 px-2">
                {section.title}
              </div>
            )}
            <div className="flex flex-col gap-1">
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-gray-700 font-semibold"
                        : "hover:bg-gray-700"
                    }`}
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
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
