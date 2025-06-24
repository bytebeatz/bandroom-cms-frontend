"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      const { error } = await res.json();
      setError(error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 space-y-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
          Admin Login
        </h2>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <input
          type="email"
          placeholder="admin@bandroom.xyz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-indigo-500"
          required
        />

        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-indigo-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-300 transition"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
