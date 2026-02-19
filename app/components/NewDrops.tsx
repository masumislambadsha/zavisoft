"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

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
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products?offset=0&limit=4",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
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
      <section className="py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A69E2]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center min-h-[400px]">
            <p className="text-red-500 text-lg mb-4">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#4A69E2] text-white px-6 py-2 rounded-lg hover:bg-[#3A59D2] transition-colors"
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
      <section className="py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-gray-500 text-lg">No products available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-black text-[#232321]">
            DON'T MISS OUT
            <br />
            NEW DROPS
          </h2>
          <Link
            href="/products"
            className="bg-[#4A69E2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3A59D2] transition-colors text-sm uppercase"
          >
            Shop New Drops
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
