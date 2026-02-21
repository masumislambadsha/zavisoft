"use client";

import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import toast from "react-hot-toast";
import RelatedProducts from "@/app/components/RelatedProducts";

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
    const res = await axios.get(
      `https://api.escuelajs.co/api/v1/products/${id}`,
    );
    return res.data;
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
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("navy");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const { id } = await params;
        const data = await getProduct(id);
        if (!data) {
          notFound();
        }
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [params]);

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e7e7e3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading product...</p>
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
      toast.error("Please select a size");
      return;
    }
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
    });
    toast.success("Added to cart successfully!");
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    });

    if (isInWishlist(product.id)) {
      toast.success("Removed from wishlist");
    } else {
      toast.success("Added to wishlist!");
    }
  };

  const isProductInWishlist = isInWishlist(product.id);

  // Ensure we always have 4 images by repeating if necessary
  const displayImages = [...product.images];
  while (displayImages.length < 4) {
    displayImages.push(...product.images);
  }
  const fourImages = displayImages.slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1320px] mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            {/* Mobile Layout: Large image on top with dots, thumbnails below */}
            <div className="md:hidden space-y-3">
              {/* Main large image */}
              <div className="relative h-64 sm:h-80 bg-white rounded-2xl overflow-hidden">
                <Image
                  src={fourImages[selectedImageIndex]}
                  alt={product.title}
                  fill
                  className="object-contain p-6"
                  unoptimized
                />

                {/* Pagination dots - mobile only */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {fourImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImageIndex === index
                          ? "bg-blue-600 w-6"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail images row - mobile */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {fourImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 sm:h-24 bg-white rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImageIndex === index
                        ? "ring-2 ring-blue-600"
                        : "hover:ring-2 hover:ring-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Layout: 2x2 grid of images */}
            <div className="hidden md:grid grid-cols-2 gap-3 md:gap-4">
              {fourImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-48 md:h-64 lg:h-80 bg-white rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${product.title} - Image ${index + 1}`}
                    fill
                    className="object-contain p-3 md:p-4"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* details */}
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

            {/* color select */}
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

            {/* size select */}
            <div>
              <div className="flex justify-between items-center mb-2 md:mb-3">
                <h3 className="text-xs md:text-sm font-semibold text-gray-900">
                  SIZE
                </h3>
                <button className="text-xs md:text-sm text-gray-600 underline hover:text-gray-900">
                  SIZE CHART
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 border rounded-lg text-xs md:text-sm font-medium transition-colors ${
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

            {/* action btn */}
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 text-white py-3 md:py-4 rounded-lg text-sm md:text-base font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ADD TO CART
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center transition-colors ${
                  isProductInWishlist
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
                aria-label={
                  isProductInWishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill={isProductInWishlist ? "currentColor" : "none"}
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

            {/* infos */}
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

        {/* related products */}
        <RelatedProducts
          categoryId={product.category.id}
          currentProductId={product.id}
          limit={4}
        />
      </div>
    </div>
  );
}
