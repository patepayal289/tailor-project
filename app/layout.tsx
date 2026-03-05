"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if current route is admin
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

        {/* Show Navbar only if NOT admin */}
        {!isAdminPage && (
          <nav className="bg-white shadow-md p-4 flex justify-between items-center relative z-50">
            
            <h1 className="text-xl md:text-2xl font-bold text-pink-600">
              vasundara Boutique
            </h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 font-medium">
              <Link href="/" className="hover:text-pink-600">Home</Link>
              <Link href="/about" className="hover:text-pink-600">About</Link>
              <Link href="/shop" className="hover:text-pink-600">Shop</Link>
              <Link href="/contact" className="hover:text-pink-600">Contact</Link>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden text-2xl transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>

            {/* Mobile Menu */}
            <div
              className={`absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden z-50 transition-all duration-300 ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-5 pointer-events-none"
              }`}
            >
              <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
              <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </div>
          </nav>
        )}

        <main>{children}</main>

        {/* Show Footer only if NOT admin */}
        {!isAdminPage && (
          <footer className="bg-pink-600 text-white text-center p-4 text-sm">
            © 2026 vasundara Boutique | Anand, Gujarat
          </footer>
        )}
      </body>
    </html>
  );
}