
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProductDetails() {
  const location = useLocation();
  const { title, price, image } = location.state || {};

  if (!title) {
    return <p className="text-center mt-20">Product not found.</p>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <img src={image} alt={title} className="w-full h-96 object-contain object-center rounded-lg shadow" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-2xl text-blue-600 mb-6">₹{price}</p>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Here you can display product description, reviews, and other details.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
