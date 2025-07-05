import { getUserFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/ui/Navbar";

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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar user={{ email: user.email }} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
