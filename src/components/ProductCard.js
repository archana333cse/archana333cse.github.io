// src/components/ProductCard.js
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ id, title, price, image }) {
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();

  // Check if product is already in wishlist
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const wishlistKey = `wishlist_${user.email}`;
      const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
      setWishlisted(wishlist.some((item) => item.id === id));
    }
  }, [id]);

  // ✅ Wishlist toggle
  const toggleWishlist = (e) => {
    e.stopPropagation();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to use wishlist.");
      navigate("/login");
      return;
    }

    const wishlistKey = `wishlist_${user.email}`;
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

    if (!wishlisted) {
      wishlist.push({ id, title, price, image });
      setWishlisted(true);
      alert("Item added to wishlist.");
    } else {
      wishlist = wishlist.filter((item) => item.id !== id);
      setWishlisted(false);
    }

    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  };

  // ✅ Add to Cart
  const handleAddToCart = (e) => {
    e.stopPropagation();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    const cartKey = `cart_${user.email}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    if (!cart.some((item) => item.id === id)) {
      cart.push({ id, title, price, image, quantity: 1 });
      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert("Item added to cart 🛒");
    } else {
      alert("Item already in cart.");
    }
  };

  // Navigate to product detail
  const handleCardClick = () => {
    navigate(`/product/${id}`, { state: { id, title, price, image } });
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white shadow rounded-lg p-4 w-full cursor-pointer relative hover:shadow-lg transition"
    >

      {/* Wishlist Icon */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
      >
        <Heart
          size={22}
          fill={wishlisted ? "red" : "none"}
          stroke={wishlisted ? "red" : "currentColor"}
        />
      </button>

      <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded mb-2">
        <img src={image} alt={title} className="max-h-full max-w-full object-contain" />
      </div>

      <h2 className="mt-2 font-semibold truncate">{title}</h2>
      <p className="text-gray-600">₹{price}</p>

      {/* Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert("Buy Now clicked! (Integrate checkout later)");
          }}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
