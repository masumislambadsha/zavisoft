"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: number;
  name: string;
  image: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/categories",
        );

        
        const validCategories = response.data.filter(
          (cat: Category) => cat.image && cat.image.startsWith("http"),
        );

        setCategories(validCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!loading && categories.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(".category-card", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading, categories]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, categories.length - 2) : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= categories.length - 2 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <section className="py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-[#232321]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[300px] md:min-h-[400px]">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-[#232321]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center min-h-[300px] md:min-h-[400px]">
            <p className="text-red-500 text-base md:text-lg mb-4">
              Error: {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-[#232321] px-5 md:px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm md:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-[#232321]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[300px] md:min-h-[400px]">
            <p className="text-white text-base md:text-lg">
              No categories available
            </p>
          </div>
        </div>
      </section>
    );
  }

  const visibleCategories = categories.slice(currentIndex, currentIndex + 2);
  const bgColors = ["#ECEEF0", "#F6F6F6"];

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-[#232321]"
    >
      <div className="max-w-7xl mx-auto">
        {/* section header */}
        <div
          ref={headerRef}
          className="flex justify-between items-center mb-6 md:mb-8 lg:mb-10"
        >
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-semibold md:font-black text-white md:uppercase">
            Categories
          </h2>

          {/* navigation */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white hover:bg-gray-100 flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft
                className="w-4 h-4 md:w-5 md:h-5 text-[#232321]"
                strokeWidth={2.5}
              />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white hover:bg-gray-100 flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <ChevronRight
                className="w-4 h-4 md:w-5 md:h-5 text-[#232321]"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>

        {/* category container */}
        <div className="flex flex-col md:flex-row rounded-tl-[32px] md:rounded-tl-[40px] lg:rounded-tl-[48px] overflow-hidden shadow-lg ml-2 md:ml-4">
          {visibleCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="category-card group relative flex-1 h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] hover:shadow-xl transition-all"
              style={{ backgroundColor: bgColors[index] }}
            >
              {/* category img */}
              <div className="relative w-full h-full flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={450}
                  height={450}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>

              {/*  info - bottom left */}
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 flex justify-between items-end">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#232321] uppercase">
                  {category.name}
                </h3>

                {/* arrow icon */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#232321] flex items-center justify-center group-hover:bg-[#3A3A38] transition-colors shrink-0">
                  <ArrowUpRight
                    className="w-5 h-5 md:w-6 md:h-6 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
