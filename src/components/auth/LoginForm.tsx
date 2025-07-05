"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Login failed");
    }
  }

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto backdrop-blur-xl bg-gray-100 border border-zinc-300 rounded-2xl p-8 sm:p-10 space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-800">
          Admin Login
        </h1>
        <p className="text-sm text-zinc-500">BANDROOM</p>
      </div>

      {error && (
        <div className="text-center text-sm text-red-600 bg-red-100 border border-red-200 rounded p-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-zinc-300 bg-white/70 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@admin.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-zinc-300 bg-white/70 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm rounded-lg transition"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
