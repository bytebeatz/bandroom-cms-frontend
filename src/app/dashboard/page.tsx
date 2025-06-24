import { redirect } from "next/navigation";
import { verifyJWT, JwtPayload } from "@/lib/auth";
import { cookies } from "next/headers";
import LogoutButton from "@/components/ui/LogoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies(); // ✅ await this
  const token = cookieStore.get("access_token")?.value;

  if (!token) redirect("/auth/login");

  const user: JwtPayload | null = verifyJWT(token);
  if (!user) redirect("/auth/login");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-white">
        Welcome to the Dashboard
      </h1>
      <p className="mt-2 text-sm text-gray-400">Logged in as {user.email}</p>

      <LogoutButton />
    </div>
  );
}
