"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export default function NewDrops() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products?offset=0&limit=4",
        );
        setProducts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[300px] md:min-h-[400px]">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-[#4A69E2]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center min-h-[300px] md:min-h-[400px]">
            <p className="text-red-500 text-base md:text-lg mb-4">
              Error: {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#4A69E2] text-white px-5 md:px-6 py-2 rounded-lg hover:bg-[#3A59D2] transition-colors text-sm md:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[300px] md:min-h-[400px]">
            <p className="text-gray-500 text-base md:text-lg">
              No products available
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* section header */}
        <div className="flex justify-between items-start sm:items-center mb-4 md:mb-6 lg:mb-8 gap-3 md:gap-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold md:font-black text-[#232321] leading-tight md:uppercase">
            {"Don't miss out"}
            <br />
            new drops
          </h2>
          <Link
            href="/products"
            className="bg-[#4A69E2] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-[#3A59D2] transition-colors text-xs md:text-sm uppercase whitespace-nowrap"
          >
            Shop New Drops
          </Link>
        </div>

        {/* products grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              images={product.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
