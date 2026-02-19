import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export default function ProductCard({
  id,
  title,
  price,
  images,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      {/* New Badge */}
      <div className="relative">
        <span className="absolute top-4 left-4 bg-[#4A69E2] text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          New
        </span>

        {/* Product Image */}
        <div className="relative h-64 bg-gray-100">
          <Image
            src={images[0] || "/placeholder.png"}
            alt={title}
            fill
            className="object-contain p-4"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-[#232321] mb-3 uppercase line-clamp-2 min-h-[40px]">
          {title}
        </h3>

        {/* View Product Button */}
        <Link
          href={`/products/${id}`}
          className="block w-full bg-[#232321] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#3A3A38] transition-colors text-sm"
        >
          VIEW PRODUCT - <span className="text-[#FFA52F]">${price}</span>
        </Link>
      </div>
    </div>
  );
}
