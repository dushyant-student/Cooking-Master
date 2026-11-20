import Image from "next/image";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Emily Carter",
    country: "United States",
    image: "/customerImage/bannerImage/customer1.jpg",
    review:
      "I absolutely love this recipe platform! The recipes are simple, well explained, and perfect for trying something new every week.",
  },
  {
    name: "James Wilson",
    country: "United Kingdom",
    image: "/customerImage/bannerImage/customer2.jpg",
    review:
      "A fantastic place to discover new dishes. The instructions are easy to follow, and I've already found several family favorites!",
  },
  {
    name: "Sophia Martin",
    country: "Canada",
    image: "/customerImage/bannerImage/customer3.jpg",
    review:
      "The variety of recipes is incredible. I especially enjoy exploring recipes from different cuisines. Everything I've tried so far has been delicious!",
  },
  {
    name: "Daniel Brown",
    country: "Australia",
    image: "/customerImage/bannerImage/customer4.jpg",
    review:
      "This website has made cooking at home much more enjoyable. The recipes are clear, practical, and perfect for both beginners and experienced cooks.",
  },
];

export default function CustomerReviews() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">
            Testimonials
          </p>

          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Discover why food lovers around the world love exploring and
            cooking with our recipes.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Profile */}
              <div className="flex items-center gap-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-orange-50"
                />

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {review.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {review.country}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="mt-5 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={17}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mt-4 text-sm leading-7 text-gray-600">
                "{review.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}