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
    <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      {/* badge */}
      <div className="relative">
        <span className="absolute top-2.5 md:top-4 left-2.5 md:left-4 bg-[#4A69E2] text-white text-[10px] md:text-xs font-semibold px-2 md:px-3 py-0.5 md:py-1 rounded-full z-10">
          New
        </span>

        {/* product img */}
        <div className="relative h-36 sm:h-44 md:h-56 lg:h-64 bg-gray-100">
          <Image
            src={images[0] || "/placeholder.png"}
            alt={title}
            fill
            className="object-contain p-2 md:p-3 lg:p-4"
          />
        </div>
      </div>

      {/* info */}
      <div className="p-2.5 md:p-3 lg:p-4">
        <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#232321] mb-2 md:mb-3 uppercase line-clamp-2 min-h-[28px] sm:min-h-[32px] md:min-h-[40px]">
          {title}
        </h3>

        {/* view product btn */}
        <Link
          href={`/products/${id}`}
          className="block w-full bg-[#232321] text-white text-center py-2 md:py-2.5 lg:py-3 rounded-lg font-semibold hover:bg-[#3A3A38] transition-colors text-[10px] sm:text-xs md:text-sm"
        >
          VIEW PRODUCT - <span className="text-[#FFA52F]">${price}</span>
        </Link>
      </div>
    </div>
  );
}
