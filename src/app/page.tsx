import { getUserFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getUserFromCookie();

  if (user && user.role === "admin") {
    redirect("/dashboard");
  } else {
    redirect("/auth/login");
  }
}
