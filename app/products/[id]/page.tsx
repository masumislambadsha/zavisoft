"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("navy");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      const { id } = await params;
      const data = await getProduct(id);
      if (!data) {
        notFound();
      }
      setProduct(data);

      // Fetch related products from the same category
      try {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/products?categoryId=${data.category.id}&limit=8`,
          { cache: "no-store" },
        );
        if (res.ok) {
          const products = await res.json();
          // Filter out current product and limit to 8
          setRelatedProducts(
            products.filter((p: Product) => p.id !== data.id).slice(0, 8),
          );
        }
      } catch {
        console.log("Failed to load related products");
      }
    }
    loadProduct();
  }, [params]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
  const colors = [
    { name: "navy", color: "bg-gray-800" },
    { name: "green", color: "bg-green-700" },
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    // Cart functionality will be implemented later with context
    console.log("Add to cart:", {
      product: product.title,
      color: selectedColor,
      size: selectedSize,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1320px] mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 lg:col-span-2 gap-3 md:gap-4">
            {product.images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className="relative h-40 sm:h-48 md:h-64 lg:h-72 xl:h-80 bg-white rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${product.title} - Image ${index + 1}`}
                  fill
                  className="object-contain p-3 md:p-4"
                />
              </div>
            ))}
            <div className="relative h-40 sm:h-48 md:h-64 lg:h-72 xl:h-80 bg-white rounded-lg overflow-hidden">
              <Image
                src={product.images[0]}
                alt={`${product.title} - Main`}
                fill
                className="object-contain p-3 md:p-4"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4 md:space-y-6">
            <div className="inline-block bg-blue-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium">
              New Release
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="text-2xl md:text-3xl font-bold text-blue-600">
              ${product.price}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-2 md:mb-3">
                COLOR
              </h3>
              <div className="flex gap-2 md:gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full ${color.color} border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-gray-900 ring-2 ring-offset-2 ring-gray-900"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    aria-label={`Select ${color.name} color`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-2 md:mb-3">
                <h3 className="text-xs md:text-sm font-semibold text-gray-900">
                  SIZE
                </h3>
                <button className="text-xs md:text-sm text-gray-600 underline hover:text-gray-900">
                  SIZE CHART
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1.5 md:gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 md:py-3 px-2 md:px-4 border rounded-lg text-xs md:text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-900 border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 text-white py-3 md:py-4 rounded-lg text-sm md:text-base font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ADD TO CART
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
                aria-label="Add to wishlist"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill={isWishlisted ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 md:py-4 rounded-lg text-sm md:text-base font-semibold hover:bg-blue-700 transition-colors">
              BUY IT NOW
            </button>

            {/* Product Information */}
            <div className="border-t pt-4 md:pt-6">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                ABOUT THE PRODUCT
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {product.description}
              </p>

              <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Pay over time in interest-free installments with Affirm,
                    Klarna or Afterpay.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Join adiClub to get unlimited free standard shipping,
                    returns, & exchanges.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* You may also like section */}
        {relatedProducts.length > 0 && (
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
                      container.scrollBy({ left: -300, behavior: "smooth" });
                    }
                  }}
                  className="w-9 h-9 md:w-10 md:h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-colors"
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
                      container.scrollBy({ left: 300, behavior: "smooth" });
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

            <div
              id="related-scroll"
              className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="shrink-0 w-52 md:w-64 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-blue-600 text-white text-xs font-semibold px-2 md:px-3 py-1 rounded-full z-10">
                      New
                    </span>
                    <div className="relative h-40 md:h-48 bg-gray-100">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.title}
                        fill
                        className="object-contain p-3 md:p-4"
                      />
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-2 md:mb-3 uppercase line-clamp-2 min-h-[32px] md:min-h-[40px]">
                      {relatedProduct.title}
                    </h3>
                    <a
                      href={`/products/${relatedProduct.id}`}
                      className="block w-full bg-gray-900 text-white text-center py-2 md:py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-xs md:text-sm"
                    >
                      VIEW PRODUCT -{" "}
                      <span className="text-yellow-500">
                        ${relatedProduct.price}
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
