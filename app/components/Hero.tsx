import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className=" px-4 py-6 lg:px-8">

      <div className="max-w-[1320px] mx-auto">
        <div className="font-bold text-[209.5px]  uppercase text">
            <h1 className="font-black text-center">
              <span className="text-[#232321]">DO IT </span>
              <span className="text-[#4A69E2]">RIGHT</span>
            </h1>
          </div>

        {/* Hero Card with Background Image and Title Inside */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[600px] lg:h-[700px]">
          {/* Background Image - hero-main.png */}
          <Image
            src="/hero-main.png"
            alt="Nike Air Max"
            fill
            className="object-cover"
            priority
          />
          {/* Left Badge */}
          <div className="absolute left-0 top-40 -translate-y-1/2 bg-[#FF6B35] text-white px-2 py-6 rounded-r-md z-20">
            <p className="text-[10px] font-medium [writing-mode:vertical-lr] rotate-180 whitespace-nowrap">
              Nike product of the year
            </p>
          </div>

          {/* Bottom Left Content */}
          <div className="absolute bottom-8 left-8 z-10 max-w-md">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-3">
              NIKE AIR MAX
            </h2>
            <p className="text-white text-sm lg:text-base mb-4 max-w-xs">
              Nike introducing the new air max for everyone's comfort
            </p>
            <Link
              href="/products"
              className="bg-[#4A69E2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3A59D2] transition-colors inline-block uppercase text-xs"
            >
              Shop Now
            </Link>
          </div>

          {/* Right - Mini Thumbnail Images */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-3 z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 hover:bg-white transition-all cursor-pointer border-2 border-[#FFA52F] w-20 h-20 lg:w-24 lg:h-24">
              <Image
                src="/hero-mini-1.png"
                alt="Nike Air Max View 1"
                width={80}
                height={80}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 hover:bg-white transition-all cursor-pointer border-2 border-[#E91E63] w-20 h-20 lg:w-24 lg:h-24">
              <Image
                src="/hero-mini-2.png"
                alt="Nike Air Max View 2"
                width={80}
                height={80}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
