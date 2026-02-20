"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";
import RelatedProducts from "../components/RelatedProducts";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useCart();

  const deliveryFee = 6.99;
  const total = cartTotal + deliveryFee;

  const handleRemoveItem = (id: number, size: number, color: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won&apos;t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id, size, color);
        Swal.fire({
          title: "Deleted!",
          text: "Item has been removed from your cart.",
          icon: "success",
        });
      }
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#e7e7e3] py-8">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Bag is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some items to your bag to get started
            </p>
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e7e7e3] py-8">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Header Banner */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Saving to celebrate
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-1">
            Enjoy up to 60% off thousands of styles during the End of Year sale
            - while supplies last. No code needed.
          </p>
          <p className="text-gray-600 text-sm">
            <Link href="/login" className="underline hover:text-gray-900">
              Join us
            </Link>{" "}
            or{" "}
            <Link href="/login" className="underline hover:text-gray-900">
              Sign-in
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Your Bag */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Your Bag
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Items in your bag not reserved- check out now to make them
                yours.
              </p>

              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex gap-6 pb-6 border-b last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-2xl shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-4"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg md:text-xl uppercase mb-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 text-sm mb-1">
                            Men&apos;s Road Running Shoes
                          </p>
                          <p className="text-gray-500 text-sm capitalize">
                            {item.color}
                          </p>
                        </div>
                        <p className="font-bold text-blue-600 text-xl md:text-2xl">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            Size {item.size}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            Quantity {item.quantity}
                          </span>
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.color,
                                parseInt(e.target.value),
                              )
                            }
                            className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <svg
                            className="w-6 h-6"
                            fill="none"
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
                        <button
                          onClick={() =>
                            handleRemoveItem(item.id, item.size, item.color)
                          }
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 md:p-8 sticky top-24">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-900 font-medium">
                    {cartCount} {cartCount === 1 ? "ITEM" : "ITEMS"}
                  </span>
                  <span className="font-bold text-gray-900">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900 font-medium">Delivery</span>
                  <span className="font-bold text-gray-900">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900 font-medium">Sales Tax</span>
                  <span className="font-bold text-gray-900">-</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-gray-900 text-white py-4 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors mb-4">
                CHECKOUT
              </button>

              <button className="w-full text-gray-600 text-sm underline hover:text-gray-900">
                Use a promo code
              </button>
            </div>
          </div>
        </div>

        {/* You may also like section */}
        <RelatedProducts limit={4} />
      </div>
    </div>
  );
}
