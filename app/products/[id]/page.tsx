import Image from "next/image";
import { notFound } from "next/navigation";

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
  } catch (error) {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {product.images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className="relative  bg-white rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${product.title} - Image ${index + 1}`}
                  fill
                  className="object-contain p-4"
                />
              </div>
            ))}
            <div className="relative  bg-white rounded-lg overflow-hidden">
              <Image
                src={product.images[0]}
                alt={`${product.title} - Main`}
                fill
                className="object-contain p-4"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              New Release
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="text-3xl font-bold text-blue-600">
              ${product.price}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                COLOR
              </h3>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-900 ring-2 ring-offset-2 ring-gray-900"></button>
                <button className="w-10 h-10 rounded-full bg-green-700 border-2 border-gray-300"></button>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-900">SIZE</h3>
                <button className="text-sm text-gray-600 underline">
                  SIZE CHART
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`py-3 px-4 border rounded-lg text-sm font-medium transition-colors ${
                      size === 38
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
            <div className="flex gap-3">
              <button className="flex-1 bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                ADD TO CART
              </button>
              <button className="w-14 h-14 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
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
            </div>

            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              BUY IT NOW
            </button>

            {/* Product Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ABOUT THE PRODUCT
              </h3>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <ul className="space-y-2 text-sm text-gray-600">
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
      </div>
    </div>
  );
}
