// src/pages/Home.js
import { useEffect, useState } from "react";
import Header from "../components/Header";
import BannerCarousel from "../components/BannerCarousel";
import Footer from "../components/Footer";
import CategorySection from "../components/CategorySection";
import axios from "axios";

export default function Home() {
     const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);
 const topDeals = products.filter(p => p.category === 'Top Deals');
const bestSellers = products.filter(p => p.category === 'Best Sellers');
const newArrivals = products.filter(p => p.category === 'New Arrivals');

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 text-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Big Festive Sale is Here!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Get up to 70% off on top brands across categories
        </p>
        <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700">
          Shop Now
        </button>
      </section>

      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Categories / Product Sections */}
      <CategorySection title="Top Deals" products={topDeals} />
      <CategorySection title="Best Sellers" products={bestSellers} />
      <CategorySection title="New Arrivals" products={newArrivals} />
      

      <Footer />
    </div>
  );
}
