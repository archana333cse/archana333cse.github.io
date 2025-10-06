// src/components/BannerCarousel.js
import { useRef, useEffect, useState } from "react";
import banner1 from "../assets/banner/banner1.jpg";
import banner2 from "../assets/banner/banner2.jpg";
import banner3 from "../assets/banner/banner3.jpg";

export default function BannerCarousel() {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);
  const banners = [banner1, banner2, banner3];

  // Manual scroll function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      let newIndex = index;

      if (direction === "left") {
        newIndex = index === 0 ? banners.length - 1 : index - 1;
      } else {
        newIndex = (index + 1) % banners.length;
      }

      setIndex(newIndex);
      scrollRef.current.scrollTo({
        left: newIndex * clientWidth,
        behavior: "smooth",
      });
    }
  };

  // Auto play every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 3000); // change banner every 3s

    return () => clearInterval(interval); // cleanup
  }, [index]); // depends on index

  return (
    <section className="relative py-6 bg-blue-50">
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700"
      >
        &#8592;
      </button>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700"
      >
        &#8594;
      </button>

      {/* Banner Images */}
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden scroll-smooth space-x-4 px-8"
      >
        {banners.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Banner ${i + 1}`}
            className="w-full h-56 md:h-80 lg:h-96 flex-shrink-0 rounded-xl object-cover shadow"
          />
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full ${
              i === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
}
