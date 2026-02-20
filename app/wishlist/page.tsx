"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveItem = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Remove this item from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromWishlist(id);
        Swal.fire({
          title: "Removed!",
          text: "Item has been removed from your wishlist.",
          icon: "success",
        });
      }
    });
  };

  const handleMoveToCart = (item: (typeof wishlist)[0]) => {
    // Add to cart with default size and color
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      color: "navy",
      size: 42,
    });
    removeFromWishlist(item.id);
    toast.success("Moved to cart!");
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#e7e7e3] py-4 sm:py-8">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Save items you love to your wishlist
            </p>
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e7e7e3] py-4 sm:py-8">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your Wishlist
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            {wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved
          </p>
        </div>

        {/* Wishlist Items */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="relative h-48 sm:h-56 bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-4"
                    unoptimized
                  />
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base uppercase mb-2 line-clamp-2 min-h-[40px]">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl font-bold text-blue-600 mb-3">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/products/${item.id}`}
                      className="w-full bg-gray-900 text-white text-center py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full bg-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-block text-gray-600 hover:text-gray-900 underline text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
