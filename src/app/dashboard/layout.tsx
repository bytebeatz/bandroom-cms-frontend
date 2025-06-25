// src/app/dashboard/layout.tsx
import Sidebar from "@/components/layout/Sidebar";
import NavBar from "@/components/layout/NavBar";
import { getCurrentUserFromCookies } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserFromCookies();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-white dark:bg-black text-black dark:text-white">
        {/* Sticky NavBar */}
        <div className="sticky top-0 z-50">
          <NavBar email={user?.email || "admin@bandroom"} />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
