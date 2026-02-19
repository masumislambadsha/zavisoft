"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingCart, Triangle } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [cartCount] = useState(0);

  return (
    <nav className="sticky top-0 z-50 pt-10">
      <div className="bg-white rounded-[24px] max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center font-semibold text hover:text-gray-600 transition-colors"
            >
              New Drops 🔥
            </Link>

            <div className="relative group">
              <button className="flex gap-1 items-center font-semibold text hover:text-gray-600 transition-colors">
                Men
                <Triangle className="rotate-180 " fill="black" size={8} />
              </button>
            </div>

            <div className="relative group">
              <button className="flex gap-1 items-center text font-semibold hover:text-gray-600 transition-colors">
                Women
                <Triangle className="rotate-180 " fill="black" size={8} />
              </button>
            </div>
          </div>

          {/* Center Section - Logo */}
          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <Image
              src="/Logo.png"
              alt="KICKS Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Right Section - Icons */}
          <div className="flex items-center space-x-6">
            <button
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 font-semibold"   />
            </button>

            <button
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" fill="black" />
            </button>

            <Link href="/cart" className="relative" aria-label="Shopping Cart">
              <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-sm hover:bg-orange-500 transition-colors">
                {cartCount}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
