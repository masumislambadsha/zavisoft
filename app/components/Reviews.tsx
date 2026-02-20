import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    title: "Good Quality",
    description: "I highly recommend shopping from kicks",
    rating: 5.0,
    image: "/review-1.png",
    avatar: "/review-1.png",
  },
  {
    id: 2,
    title: "Good Quality",
    description: "I highly recommend shopping from kicks",
    rating: 5.0,
    image: "/review-2.png",
    avatar: "/review-2.png",
  },
  {
    id: 3,
    title: "Good Quality",
    description: "I highly recommend shopping from kicks",
    rating: 5.0,
    image: "/review-3.png",
    avatar: "/review-3.png",
  },
];

export default function Reviews() {
  return (
    <section className="py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* section header */}
        <div className="flex justify-between items-start sm:items-center mb-6 md:mb-8 lg:mb-10 gap-4">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-semibold md:font-black text-[#232321] md:uppercase">
            Reviews
          </h2>

          <Link
            href="/reviews"
            className="bg-[#4A69E2] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-medium md:font-semibold hover:bg-[#3A59D2] transition-colors text-xs md:text-sm uppercase whitespace-nowrap"
          >
            See All
          </Link>
        </div>

        {/* reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#FAFAFA] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* review head */}
              <div className="p-4 sm:p-5 md:p-6 pb-3 md:pb-4">
                <div className="flex justify-between items-start mb-2 md:mb-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#232321] mb-1">
                      {review.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      {review.description}
                    </p>
                  </div>

                  {/* profile pic */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 ml-3">
                    <Image
                      src={review.avatar}
                      alt="Reviewer"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 md:w-4 md:h-4 fill-[#FFA52F] text-[#FFA52F]"
                    />
                  ))}
                  <span className="text-xs md:text-sm font-semibold text-[#232321] ml-1">
                    {review.rating}
                  </span>
                </div>
              </div>

              {/* review img */}
              <div className="relative h-48 sm:h-56 md:h-64">
                <Image
                  src={review.image}
                  alt={review.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
