import ProductCard from "./ProductCard";

export default function CategorySection({ title, products,user }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            brand={product.brand} 
            user={user}
          />
        ))}
      </div>
    </section>
  );
}
