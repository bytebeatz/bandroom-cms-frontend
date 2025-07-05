import { getUserFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookie();

  if (!user || user.role !== "admin") {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
