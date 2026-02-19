import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function CategorySection({ title, products, user }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;

    if (direction === "left") {
      container.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      container.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="relative my-10 px-6">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Scrollable Product Row */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[250px] flex-shrink-0">
            <ProductCard
              id={product.id}
              title={product.title}
              price={product.price}
              discount={product.discount}
              image={product.image}
              brand={product.brand}
              user={user}
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
}