import Link from "next/link";

export default function Home() {
  return (
    <div>

      {/* HERO */}
      <section className="relative h-[75vh] md:h-[85vh] flex items-center justify-center text-center bg-[url('https://images.unsplash.com/photo-1520975922284-9c6bcd55f5c7')] bg-cover bg-center">

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-white px-4 md:px-6 max-w-3xl">
          
          <p className="bg-pink-600 inline-block px-3 py-1 rounded-full text-xs md:text-sm mb-4">
            ✨ New Designer Collection 2026
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Perfect Fit. Elegant Style.
          </h1>

          <p className="mt-3 md:mt-4 text-sm md:text-lg">
            Custom Blouse Stitching with Premium Finish
          </p>

          <Link
            href="/shop"
            className="inline-block mt-6 md:mt-8 bg-pink-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full shadow-lg hover:bg-pink-700 transition"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="py-10 md:py-16 bg-pink-50 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-8 md:mb-10">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-6 md:px-20">
          <div>
            <h3 className="font-semibold text-lg md:text-xl">
              Perfect Fitting
            </h3>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Accurate measurements for flawless stitching.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg md:text-xl">
              Premium Quality
            </h3>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              High-quality fabrics and designer finishing.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg md:text-xl">
              On-Time Delivery
            </h3>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Fast and reliable stitching service.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}