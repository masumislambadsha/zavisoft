"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
  };
}

interface RelatedProductsProps {
  categoryId?: number;
  currentProductId?: number;
  limit?: number;
}

export default function RelatedProducts({
  categoryId,
  currentProductId,
  limit = 8,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let url = `https://api.escuelajs.co/api/v1/products?limit=${limit}`;
        if (categoryId) {
          url = `https://api.escuelajs.co/api/v1/products?categoryId=${categoryId}&limit=${limit}`;
        }

        const res = await axios.get(url);
        const data = res.data;
        const filtered = currentProductId
          ? data.filter((p: Product) => p.id !== currentProductId)
          : data;
        setProducts(filtered);
      } catch {
        console.log("Failed to load related products");
      }
    }
    fetchProducts();
  }, [categoryId, currentProductId, limit]);

  if (products.length === 0) {
    return null;
  }

  const handlePrev = () => {
    if (isMobile) {
      setCurrentIndex((prev) => Math.max(0, prev - 4));
    } else {
      const container = document.getElementById("related-scroll");
      if (container) {
        container.scrollBy({ left: -300, behavior: "smooth" });
      }
    }
  };

  const handleNext = () => {
    if (isMobile) {
      setCurrentIndex((prev) => Math.min(products.length - 4, prev + 4));
    } else {
      const container = document.getElementById("related-scroll");
      if (container) {
        container.scrollBy({ left: 300, behavior: "smooth" });
      }
    }
  };
  const visibleProducts = isMobile
    ? products.slice(currentIndex, currentIndex + 4)
    : products;

  return (
    <div className="mt-12 md:mt-16">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          You may also like
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={isMobile && currentIndex === 0}
            className="w-9 h-9 md:w-10 md:h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={isMobile && currentIndex >= products.length - 4}
            className="w-9 h-9 md:w-10 md:h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="related-scroll"
        className="grid grid-cols-2 md:flex gap-3 md:gap-4 md:overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow md:shrink-0 md:w-64"
          >
            <div className="relative">
              <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-blue-600 text-white text-xs font-semibold px-2 md:px-3 py-1 rounded-full z-10">
                New
              </span>
              <div className="relative h-40 md:h-48 bg-gray-100">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-contain p-3 md:p-4"
                  unoptimized
                />
              </div>
            </div>
            <div className="p-3 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-2 md:mb-3 uppercase line-clamp-2 min-h-[32px] md:min-h-[40px]">
                {product.title}
              </h3>
              <a
                href={`/products/${product.id}`}
                className="block w-full bg-gray-900 text-white text-center py-2 md:py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-xs md:text-sm"
              >
                VIEW PRODUCT -{" "}
                <span className="text-yellow-500">${product.price}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
