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
  limit = 4,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let url = "https://api.escuelajs.co/api/v1/products?limit=12";
        if (categoryId) {
          url = `https://api.escuelajs.co/api/v1/products?categoryId=${categoryId}&limit=12`;
        }

        const res = await axios.get(url);
        const data = res.data;
        // Filter out current product if provided
        const filtered = currentProductId
          ? data.filter((p: Product) => p.id !== currentProductId)
          : data;
        setProducts(filtered.slice(0, limit));
      } catch {
        console.log("Failed to load related products");
      }
    }
    fetchProducts();
  }, [categoryId, currentProductId, limit]);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 md:mt-16">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          You may also like
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const container = document.getElementById("related-scroll");
              if (container) {
                const scrollAmount =
                  window.innerWidth < 768 ? container.clientWidth : 300;
                container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
              }
            }}
            className="w-9 h-9 md:w-10 md:h-10 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg flex items-center justify-center transition-colors"
            aria-label="Scroll left"
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
            onClick={() => {
              const container = document.getElementById("related-scroll");
              if (container) {
                const scrollAmount =
                  window.innerWidth < 768 ? container.clientWidth : 300;
                container.scrollBy({ left: scrollAmount, behavior: "smooth" });
              }
            }}
            className="w-9 h-9 md:w-10 md:h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-colors"
            aria-label="Scroll right"
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

      {/* Mobile: 2-column grid with horizontal scroll, Desktop: horizontal scroll */}
      <div
        id="related-scroll"
        className="grid grid-cols-2 md:flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow md:shrink-0 md:w-64 snap-start ${
              index >= 2 ? "md:block" : ""
            }`}
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
