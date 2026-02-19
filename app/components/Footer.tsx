import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative max-w-[1320px] mx-auto">
      {/* Blue Newsletter Section */}
      <div className="bg-[#4A69E2] px-12 py-20 rounded-t-[64px]">
        <div className="flex justify-between items-center">
          {/* Left Side - Form */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-[48px] font-semibold text-white mb-4 leading-[100%] uppercase">
              Join our KicksPlus
              <br />
              Club & get 15% off
            </h2>
            <p className="text-white text-base mb-6">
              Sign up for free! Join the community.
            </p>

            {/* Email Form */}
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-5 py-3 rounded-lg bg-[#5A79F2] border-2 border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:border-white text-sm"
              />
              <button className="bg-[#232321] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3A3A38] transition-colors uppercase text-sm">
                Submit
              </button>
            </div>
          </div>

          {/* Right Side - Logo */}
          <div className="relative">
              <Image
                alt="Plus Icon"
                src="/plusIcon.png"
                height={88}
                width={351}
                className="object-contain md:-mt-8"
              />
          </div>
        </div>
      </div>

      {/* Dark Footer Section */}
      <div className="bg-[#232321] rounded-[64px] -mt-14 px-8 pt-12 pb-0 overflow-hidden">
        <div className="">
          {/* Footer Links */}
          <div className="grid grid-cols-4 gap-8 mb-16">
            {/* About Us */}
            <div>
              <h3 className="text-4xl font-semibold mb-4 text-[#FFA52F]">
                About us
              </h3>
              <p className="text-[#E7E7E3] text-xl font-semibold leading-relaxed">
                We are the biggest hyperstore in the universe. We got you all
                cover with our exclusive collections and latest drops.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-4xl font-semibold mb-4 text-[#FFA52F]">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/runners"
                    className="text-white hover:text-gray-300 transition-colors text-xl font-semibold"
                  >
                    Runners
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sneakers"
                    className="text-white hover:text-gray-300 transition-colors text-xl font-semibold"
                  >
                    Sneakers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/basketball"
                    className="text-white hover:text-gray-300 transition-colors text-xl font-semibold"
                  >
                    Basketball
                  </Link>
                </li>
                <li>
                  <Link
                    href="/outdoor"
                    className="text-white hover:text-gray-300 transition-colors text-xl font-semibold"
                  >
                    Outdoor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/golf"
                    className="text-white hover:text-gray-300 transition-colors text-xl font-semibold"
                  >
                    Golf
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hiking"
                    className="text-white hover:text-gray-300 transition-colors text-xl font-semibold"
                  >
                    Hiking
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-4xl font-semibold mb-4 text-[#FFA52F]">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-white hover:text-gray-300 transition-colors text-xl font-semibold"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white hover:text-gray-300 transition-colors text-xl font-semibold"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-white hover:text-gray-300 transition-colors text-xl font-semibold"
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-4xl font-semibold mb-4 text-[#FFA52F]">
                Follow us
              </h3>
              <div className="flex gap-3">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="w-10 h-10 rounded-lg bg-[#3A3A38] hover:bg-[#4A4A48] flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="w-10 h-10 rounded-lg bg-[#3A3A38] hover:bg-[#4A4A48] flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="w-10 h-10 rounded-lg bg-[#3A3A38] hover:bg-[#4A4A48] flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </Link>
                <Link
                  href="https://tiktok.com"
                  target="_blank"
                  className="w-10 h-10 rounded-lg bg-[#3A3A38] hover:bg-[#4A4A48] flex items-center justify-center transition-colors text-lg font-bold text-white"
                  aria-label="TikTok"
                >
                  ♪
                </Link>
              </div>
            </div>
          </div>

          {/* Large Footer Logo - Half visible, half cut off */}
          <div className="relative h-[220px] overflow-hidden rounded-b-[64px]">
            <Image
              src="/footer-logo.png"
              alt="KICKS"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Copyright */}
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm">
        © All rights reserved
      </div>
    </footer>
  );
}
