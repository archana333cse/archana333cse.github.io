// src/pages/Home.js
import { useEffect, useState } from "react";
import BannerCarousel from "../components/BannerCarousel";
import Footer from "../components/Footer";
import CategorySection from "../components/CategorySection";
import axios from "axios";
import MainCategorySection from "../components/MainCategorySection";

export default function Home({ user }) {

  const [topDeals, setTopDeals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topDealsRes = await axios.get(
          "http://localhost:5000/products?category=Top Deals&limit=100"
        );

        const bestSellersRes = await axios.get(
          "http://localhost:5000/products?category=Best Sellers&limit=100"
        );

        const newArrivalsRes = await axios.get(
          "http://localhost:5000/products?category=New Arrivals&limit=100"
        );

        setTopDeals(topDealsRes.data);
        setBestSellers(bestSellersRes.data);
        setNewArrivals(newArrivalsRes.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>

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

      <BannerCarousel />

      <MainCategorySection />

      <CategorySection title="Top Deals" products={topDeals} user={user} />
      <CategorySection title="Best Sellers" products={bestSellers} user={user} />
      <CategorySection title="New Arrivals" products={newArrivals} user={user} />

      <Footer />
    </div>
  );
}