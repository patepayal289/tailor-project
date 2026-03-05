"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-gradient-to-b from-fuchsia-800 to-purple-900
          text-white p-6 z-50
          transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button onClick={() => setMenuOpen(false)} className="text-2xl">
            ✕
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-8 hidden md:block">
          Admin Panel
        </h2>

        <ul className="space-y-4 text-lg">
          <li>
            <Link href="/admin/dashboard" className="hover:text-pink-300">
              Dashboard
            </Link>
          </li>

          <li>
            <Link href="/admin/orders" className="hover:text-pink-300">
              Orders
            </Link>
          </li>

          <li>
            <Link href="/admin/measurements" className="hover:text-pink-300">
              Measurements
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay (Mobile) */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
        />
      )}

      {/* Main Content */}
      <div className="p-4 md:p-10 md:ml-64">

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-fuchsia-700">
            Admin
          </h1>
          <button
            onClick={() => setMenuOpen(true)}
            className="text-2xl"
          >
            ☰
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}