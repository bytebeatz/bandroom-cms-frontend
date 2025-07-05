import { getUserFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookie();

  if (!user || user.role !== "admin") {
    redirect("/auth/login");
  }

  return (
    <div className="flex">
      {/* Sidebar is fixed and takes up space */}
      <div className="w-64 fixed top-0 left-0 bottom-0 z-40">
        <Sidebar user={{ email: user.email }} />
      </div>

      {/* Push content to the right of the fixed sidebar */}
      <div className="ml-64 flex-1 min-h-screen flex flex-col">
        {/* Navbar stays sticky at top of scrollable content */}
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
