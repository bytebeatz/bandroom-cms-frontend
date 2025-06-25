import { requireAdmin } from "@/lib/auth";
import NavBar from "@/components/layout/NavBar";

export default async function DashboardPage() {
  // 🔐 Enforces admin access or redirects (to /auth/login or /403)
  const user = await requireAdmin();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          You're logged in as admin.
        </p>
      </main>
    </div>
  );
}
