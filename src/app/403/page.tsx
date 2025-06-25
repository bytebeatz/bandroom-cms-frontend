// src/app/403/page.tsx
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 text-black dark:text-white p-6">
      <h1 className="text-4xl font-bold mb-4">403 – Forbidden</h1>
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
        You don’t have permission to access this page.
      </p>
      <Link
        href="/auth/login"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
      >
        Back to Login
      </Link>
    </div>
  );
}
