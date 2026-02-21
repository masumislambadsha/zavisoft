"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(heroRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(contentRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-4 py-4 md:py-6 lg:px-8">
      <div className="max-w-[1320px] mx-auto">
        <div className="font-bold uppercase text">
          <h1
            ref={titleRef}
            className="font-bold my-5 text-6xl md:text-8xl lg:text-[220px] md:leading-[0.8] tracking-normal uppercase text-center"
          >
            <span className="text-[#232321] inline-block translate-y-[6px]">
              DO IT
            </span>{" "}
            <span className="text-[#4A69E2] inline-block translate-y-[6px]">
              RIGHT
            </span>
          </h1>
        </div>

        {/* hero */}
        <div
          ref={heroRef}
          className="relative mt-4 md:mt-6 lg:mt-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl h-[380px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px]"
        >
          {/* bg-img */}
          <Image
            src="/hero-main.png"
            alt="Nike Air Max"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1320px"
          />
          {/* left bagde */}
          <div className="absolute left-0 top-[35%] sm:top-[38%] md:top-40 -translate-y-1/2 bg-[#232321] font-semibold text-[#E7E7E3] p-3 md:p-4 rounded-r-md z-20">
            <p className="text-[8px] md:text-[10px] font-medium [writing-mode:vertical-lr] rotate-180 whitespace-nowrap">
              Nike product of the year
            </p>
          </div>

          {/* bottom left content */}
          <div
            ref={contentRef}
            className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 z-10 max-w-xs md:max-w-md"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-2 md:mb-3">
              NIKE AIR MAX
            </h2>
            <p className="text-white text-xs sm:text-sm lg:text-base mb-3 md:mb-4 max-w-[250px] sm:max-w-xs">
              Nike introducing the new air max for {"everyone's"} comfort
            </p>
            <Link
              href="/products"
              className="bg-[#4A69E2] text-white px-4 sm:px-5 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-[#3A59D2] transition-colors inline-block uppercase text-xs font-sans"
            >
              Shop Now
            </Link>
          </div>

          {/* mini Images */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 flex flex-col gap-2 md:gap-3 z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl p-1.5 md:p-2 hover:bg-white transition-all cursor-pointer border-2 border-[#FFA52F] w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24">
              <Image
                src="/hero-mini-2.png"
                alt="Nike Air Max View 1"
                width={96}
                height={96}
                className="object-contain w-full h-full"
                quality={75}
                sizes="(max-width: 640px) 64px, (max-width: 768px) 72px, (max-width: 1024px) 80px, 96px"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl p-1.5 md:p-2 hover:bg-white transition-all cursor-pointer border-2 border-[#E91E63] w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24">
              <Image
                src="/mini-img-2.png"
                alt="Nike Air Max View 2"
                width={96}
                height={96}
                className="object-contain w-full h-full"
                quality={75}
                sizes="(max-width: 640px) 64px, (max-width: 768px) 72px, (max-width: 1024px) 80px, 96px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
