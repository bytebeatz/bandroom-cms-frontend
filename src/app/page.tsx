import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWT } from "@/lib/auth";

export default async function Home() {
  const cookieStore = await cookies(); // ✅ await this
  const token = cookieStore.get("access_token")?.value;

  const decoded = token ? verifyJWT(token) : null;

  if (decoded) {
    redirect("/dashboard");
  }

  redirect("/auth/login");
}
