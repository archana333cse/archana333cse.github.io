
//import ProductCard from "./ProductCard";

export default function CategorySection({ title, products }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-sm">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover mb-2" />
            <h3 className="font-medium">{product.title}</h3>
            <p className="text-gray-600">{product.brand}</p>
            <p className="text-blue-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
