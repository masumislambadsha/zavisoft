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
    <div className="group">
      {/* Image container with white bg */}
      <div className="relative bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 mb-3 md:mb-4 shadow-sm hover:shadow-lg transition-shadow">
        {/* badge */}
        <span className="absolute top-3 md:top-4 left-3 md:left-4 bg-[#4A69E2] text-white text-xs md:text-sm font-bold px-4 md:px-5 py-1.5 md:py-2 rounded-full z-10">
          New
        </span>

        {/* product img */}
        <div className="relative h-40 sm:h-48 md:h-64 lg:h-72 bg-[#F6F6F6] rounded-2xl md:rounded-3xl">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-contain p-4 md:p-6"
            quality={80}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 300px"
            loading="lazy"
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm md:text-base lg:text-lg font-bold text-[#232321] mb-3 md:mb-4 uppercase line-clamp-2 min-h-[40px] md:min-h-[48px]">
          {title}
        </h3>

        {/* view product btn */}
        <Link
          href={`/products/${id}`}
          className="block w-full bg-[#232321] text-white text-center py-3 md:py-3.5 rounded-lg font-bold hover:bg-[#3A3A38] transition-colors text-sm md:text-base"
        >
          VIEW PRODUCT - <span className="text-[#FFA52F]">${price}</span>
        </Link>
      </div>
    </div>
  );
}
