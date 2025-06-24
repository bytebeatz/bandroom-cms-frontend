import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Add any sidebar/nav/header here if needed */}
      {children}
    </div>
  );
}
