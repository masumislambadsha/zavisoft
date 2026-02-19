import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#FFA52F] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-center mb-8">
          <span className="text-[#232321]">DO IT </span>
          <span className="text-[#4A69E2]">RIGHT</span>
        </h1>

        {/* Hero Card */}
        <div className="relative bg-gradient-to-br from-[#D4A574] to-[#C89B5F] rounded-3xl overflow-hidden shadow-2xl">
          {/* Left Badge */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#232321] text-white px-3 py-8 rounded-r-lg">
            <p className="text-xs font-medium writing-mode-vertical transform -rotate-180">
              Nike product of the year
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-8 lg:p-12">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col justify-end z-10">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                NIKE AIR MAX
              </h2>
              <p className="text-white text-lg mb-6 bg-[#232321] inline-block px-4 py-2 rounded">
                Nike introducing the new air max for everyone's comfort
              </p>
              <Link
                href="/products"
                className="bg-[#4A69E2] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3A59D2] transition-colors w-fit uppercase text-sm"
              >
                Shop Now
              </Link>
            </div>

            {/* Center - Main Product Image */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <Image
                src="/hero-main.png"
                alt="Nike Air Max"
                width={500}
                height={400}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Right - Mini Images */}
            <div className="lg:col-span-2 flex lg:flex-col gap-4 justify-center items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 hover:bg-white/30 transition-all cursor-pointer border-2 border-white/40">
                <Image
                  src="/hero-mini-1.png"
                  alt="Nike Air Max View 1"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 hover:bg-white/30 transition-all cursor-pointer border-2 border-white/40">
                <Image
                  src="/hero-mini-2.png"
                  alt="Nike Air Max View 2"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
