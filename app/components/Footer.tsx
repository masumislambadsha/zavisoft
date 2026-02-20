import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative max-w-[1320px] mx-auto px-4">
      {/* newsletter */}
      <div className="bg-[#4A69E2] px-4 md:px-8 py-12 lg:px-12 lg:py-20 rounded-t-[32px] md:rounded-t-[48px] lg:rounded-t-[64px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
          {/* form */}
          <div className="flex-1 w-full md:max-w-xl">
            <h2 className="text-2xl md:text-3xl lg:text-[48px] font-semibold text-white mb-3 md:mb-4 leading-tight uppercase">
              Join our KicksPlus
              <br />
              Club & get 15% off
            </h2>
            <p className="text-white text-sm md:text-base mb-4 md:mb-6">
              Sign up for free! Join the community.
            </p>

            {/* email */}
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 md:px-5 py-3 rounded-lg bg-[#5A79F2] border-2 border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:border-white text-sm"
              />
              <button className="md:w-auto bg-[#232321] text-white px-4 md:px-8 py-3 rounded-lg font-semibold hover:bg-[#3A3A38] transition-colors uppercase text-sm">
                Submit
              </button>
            </div>
          </div>

          {/* logo */}
          <div className="relative hidden md:block">
            <Image
              alt="KICKS Plus"
              src="/plusIcon.png"
              height={88}
              width={351}
              className="object-contain"
            />
          </div>
        </div>

        {/* logo - visible on mobile */}
        <div className="mt-8 md:hidden">
          <Image
            src="/plusIcon.png"
            alt="KICKS"
            width={200}
            height={60}
            className="object-contain"
          />
        </div>
      </div>

      {/* dark footer */}
      <div className="bg-[#232321] rounded-[24px] md:rounded-[64px] -mt-5 md:-mt-14 px-4 md:px-6 lg:px-8 pt-6 md:pt-10 lg:pt-12 pb-0 overflow-hidden">
        <div>
          {/* links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12 lg:mb-16">
            {/* about us */}
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4 text-[#FFA52F]">
                About us
              </h3>
              <p className="text-[#E7E7E3] text-base md:text-lg lg:text-xl font-medium leading-relaxed font-(family-name:--font-open-sans)">
                We are the biggest hyperstore in the universe. We got you all
                cover with our exclusive collections and latest drops.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4 text-[#FFA52F]">
                Categories
              </h3>
              <ul className="space-y-2 font-(family-name:--font-open-sans)">
                <li>
                  <Link
                    href="/runners"
                    className="text-white hover:text-gray-300 transition-colors text-base md:text-lg lg:text-xl font-medium"
                  >
                    Runners
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sneakers"
                    className="text-white hover:text-gray-300 transition-colors text-base md:text-lg lg:text-xl font-medium"
                  >
                    Sneakers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/basketball"
                    className="text-white hover:text-gray-300 transition-colors text-base md:text-lg lg:text-xl font-medium"
                  >
                    Basketball
                  </Link>
                </li>
                <li>
                  <Link
                    href="/outdoor"
                    className="text-white hover:text-gray-300 transition-colors text-base md:text-lg lg:text-xl font-semibold"
                  >
                    Outdoor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/golf"
                    className="text-white hover:text-gray-300 transition-colors text-base md:text-lg lg:text-xl font-medium"
                  >
                    Golf
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hiking"
                    className="text-white hover:text-gray-300 transition-colors text-base md:text-lg lg:text-xl font-medium"
                  >
                    Hiking
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4 text-[#FFA52F]">
                Company
              </h3>
              <ul className="space-y-2 font-(family-name:--font-open-sans)">
                <li>
                  <Link
                    href="/about"
                    className="text-white hover:text-gray-300 transition-colors text-base md:text-lg lg:text-xl font-medium"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white hover:text-gray-300 transition-colors text-base md:text-lg lg:text-xl font-medium"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-white hover:text-gray-300 transition-colors text-base md:text-lg lg:text-xl font-medium"
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4 text-[#FFA52F]">
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
        </div>
        {/* footer logo for sm */}
        <div>
          <Image
            alt=""
            height={200}
            width={320}
            className="block md:hidden"
            src={"/footer-logo-mobile.png"}
          ></Image>
          <Image
            alt=""
            height={200}
            width={1320}
            className="md:block hidden"
            src={"/footer-logo.png"}
          ></Image>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs md:text-sm py-4">
        © All rights reserved
      </div>
    </footer>
  );
}
