// src/components/ProductCard.js
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductCard({
  id,
  title,
  price,
  discount = 0,
  image,
  user
}) {
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();

  // ✅ Check wishlist from DB
  useEffect(() => {
    if (!user) return;

    axios
      .get("http://localhost:5000/wishlist", {
        withCredentials: true
      })
      .then((res) => {
        const exists = res.data.some((item) => item.id === id);
        setWishlisted(exists);
      })
      .catch((err) => console.error(err));
  }, [id, user]);

  // ✅ Toggle Wishlist
  const toggleWishlist = async (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login to use wishlist.");
      navigate("/login");
      return;
    }

    try {
      if (!wishlisted) {
        await axios.post(
          "http://localhost:5000/wishlist",
          { product_id: id },
          { withCredentials: true }
        );
        setWishlisted(true);
        alert("Added to wishlist ❤️");
      } else {
        await axios.delete(
          `http://localhost:5000/wishlist/${id}`,
          { withCredentials: true }
        );
        setWishlisted(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Add to Cart (DB Version)
  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/cart",
        { product_id: id },
        { withCredentials: true }
      );

      alert("Item added to cart 🛒");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Buy Now (also DB based)
  const handleBuyNow = async (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login to continue.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/cart",
        { product_id: id },
        { withCredentials: true }
      );

      navigate("/cart"); // redirect after adding
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`, {
      state: { id, title, price, image }
    });
  };

  const discountedPrice =
    discount > 0
      ? price - (price * discount) / 100
      : price;

  return (
    <div
      onClick={handleCardClick}
      className="bg-white shadow rounded-lg p-4 w-full cursor-pointer relative hover:shadow-lg transition"
    >
      {/* Wishlist Icon */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-20 text-gray-500 hover:text-red-500"
      >
        <Heart
          size={22}
          fill={wishlisted ? "red" : "none"}
          stroke={wishlisted ? "red" : "currentColor"}
        />
      </button>

      {/* Image Section */}
      <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded mb-2 relative">
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
            {discount}% OFF
          </div>
        )}

        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Title */}
      <h2 className="mt-2 font-semibold truncate">{title}</h2>

      {/* Price */}
      <div className="mt-1">
        {discount > 0 ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              ₹{price}
            </span>

            <span className="text-black font-semibold">
              ₹{discountedPrice.toFixed(0)}
            </span>

            <span className="text-green-600 text-sm font-semibold">
              {discount}% OFF
            </span>
          </div>
        ) : (
          <span className="text-gray-700 font-semibold">
            ₹{price}
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleBuyNow}
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