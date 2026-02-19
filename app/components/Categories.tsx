"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

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

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/categories",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#232321]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#232321]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center min-h-[400px]">
            <p className="text-red-500 text-lg mb-4">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-[#232321] px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#232321]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-white text-lg">No categories available</p>
          </div>
        </div>
      </section>
    );
  }

  const visibleCategories = categories.slice(currentIndex, currentIndex + 2);
  const bgColors = ["#ECEEF0", "#F6F6F6"];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#232321]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-5xl lg:text-6xl font-black text-white uppercase">
            Categories
          </h2>

          {/* Navigation Arrows - Gray and White */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-xl bg-[#707070] hover:bg-[#606060] flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft
                className="w-5 h-5 text-[#232321]"
                strokeWidth={2.5}
              />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-xl bg-white hover:bg-gray-100 flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <ChevronRight
                className="w-5 h-5 text-[#232321]"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>

        {/* Categories Container - Single container with only top-left rounded */}
        <div className="flex rounded-tl-[48px] overflow-hidden shadow-lg ml-4">
          {visibleCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group relative flex-1 h-[600px] hover:shadow-xl transition-all"
              style={{ backgroundColor: bgColors[index] }}
            >
              {/* Category Image */}
              <div className="relative w-full h-full flex items-center  justify-center p-12">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={450}
                  height={450}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Info - Bottom Left */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <h3 className="text-3xl lg:text-4xl font-black text-[#232321] uppercase">
                  {category.name}
                </h3>

                {/* Arrow Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#232321] flex items-center justify-center group-hover:bg-[#3A3A38] transition-colors flex-shrink-0">
                  <ArrowUpRight
                    className="w-6 h-6 text-white"
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
