import { getUserFromCookie } from "@/lib/auth";
import Link from "next/link";

export default async function Navbar() {
  const user = await getUserFromCookie();

  return (
    <nav className="w-full px-6 py-4 border-b border-zinc-800 bg-background flex justify-between items-center">
      <Link href="/dashboard" className="text-lg font-bold text-foreground">
        Bandroom CMS
      </Link>

      <div className="text-sm text-foreground">
        {user?.email ? `Logged in as: ${user.email}` : "Not logged in"}
      </div>
    </nav>
  );
}
