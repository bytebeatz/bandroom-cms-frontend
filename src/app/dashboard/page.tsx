import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWT, JwtPayload } from "@/lib/auth";
import NavBar from "@/components/layout/NavBar"; // ✅ Import the NavBar you mentioned

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) redirect("/auth/login");

  const user: JwtPayload | null = verifyJWT(token);
  if (!user) redirect("/auth/login");

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar email={user.email} /> {/* ✅ Pass email to NavBar */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome to the Dashboard
        </h1>
        <p className="text-sm text-gray-400 mt-2">You're logged in as admin.</p>
      </main>
    </div>
  );
}
