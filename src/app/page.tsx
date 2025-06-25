import { redirect } from "next/navigation";
import { getAccessTokenFromCookies, verifyJWT } from "@/lib/auth";

export default async function Home() {
  const token = await getAccessTokenFromCookies();
  const decoded = token ? verifyJWT(token) : null;

  if (decoded) {
    redirect("/dashboard");
  }

  redirect("/auth/login");
}
