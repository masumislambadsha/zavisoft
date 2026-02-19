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
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-5xl lg:text-6xl font-black text-[#232321] uppercase">
            Reviews
          </h2>

          <Link
            href="/reviews"
            className="bg-[#4A69E2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3A59D2] transition-colors text-sm uppercase"
          >
            See All
          </Link>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#FAFAFA] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Review Header */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#232321] mb-1">
                      {review.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {review.description}
                    </p>
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ml-3">
                    <Image
                      src={review.avatar}
                      alt="Reviewer"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#FFA52F] text-[#FFA52F]"
                    />
                  ))}
                  <span className="text-sm font-semibold text-[#232321] ml-1">
                    {review.rating}
                  </span>
                </div>
              </div>

              {/* Review Image */}
              <div className="relative h-64">
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
