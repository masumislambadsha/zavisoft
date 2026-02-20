"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, Triangle } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 pt-4 md:pt-6 lg:pt-10 px-4">
      <div className="bg-white rounded-[16px] md:rounded-[20px] lg:rounded-[24px] max-w-[1320px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16 lg:h-20">
          {/* mobile drawer */}
          <div className="drawer md:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* hamburger */}
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost btn-circle drawer-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-white min-h-full w-80 p-4 text">
                {/* sidebar content */}
                <li>
                  <Link href="/" className="text-lg font-semibold text">
                    New Drops 🔥
                  </Link>
                </li>
                <li>
                  <details>
                    <summary className="text-lg font-semibold text">
                      Men
                    </summary>
                    <ul>
                      <li>
                        <Link href="/men/shoes" className="text">
                          Shoes
                        </Link>
                      </li>
                      <li>
                        <Link href="/men/clothing" className="text-black">
                          Clothing
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary className="text-lg font-semibold text-black">
                      Women
                    </summary>
                    <ul>
                      <li>
                        <Link href="/women/shoes" className="text-black">
                          Shoes
                        </Link>
                      </li>
                      <li>
                        <Link href="/women/clothing" className="text-black">
                          Clothing
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>

          {/* nav links */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link
              href="/"
              className="flex items-center font-semibold text-sm lg:text-base hover:text-gray-600 transition-colors text"
            >
              New Drops 🔥
            </Link>

            <div className="relative group">
              <button className="flex gap-1 items-center font-semibold text-sm lg:text-base hover:text-gray-600 transition-colors text">
                Men
                <Triangle className="rotate-180" fill="black" size={8} />
              </button>
            </div>

            <div className="relative group">
              <button className="flex gap-1 items-center text-sm lg:text-base font-semibold hover:text-gray-600 transition-colors text">
                Women
                <Triangle className="rotate-180" fill="black" size={8} />
              </button>
            </div>
          </div>

          {/* logo */}
          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <Image
              src="/Logo.png"
              alt="KICKS Logo"
              width={80}
              height={27}
              className="object-contain md:w-[100px] md:h-[33px] lg:w-[120px] lg:h-[40px]"
              priority
            />
          </Link>

          {/* login and others */}
          <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
            <button
              className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block"
              aria-label="Search"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5 font-semibold" />
            </button>

            <button
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5 md:w-5 md:h-5" fill="black" />
            </button>

            <Link href="/cart" className="relative" aria-label="Shopping Cart">
              <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-xs md:text-sm hover:bg-orange-500 transition-colors">
                {cartCount}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
