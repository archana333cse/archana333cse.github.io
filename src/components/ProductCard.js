// src/components/ProductCard.js
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ id, title, price, discount = 0, image, user }) {
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();

  // Check if product is already in wishlist
  useEffect(() => {
    //const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const wishlistKey = `wishlist_${user.email}`;
      const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
      setWishlisted(wishlist.some((item) => item.id === id));
    }
  }, [id]);

  // ✅ Wishlist toggle
  const toggleWishlist = (e) => {
    e.stopPropagation();
    //const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to use wishlist.");
      navigate("/login");
      return;
    }

    const wishlistKey = `wishlist_${user.email}`;
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

    if (!wishlisted) {
      wishlist.push({
        id,
        title,
        price,          // original price
        discount,       // store discount %
        image
      });
      setWishlisted(true);
      alert("Item added to wishlist.");
    } else {
      wishlist = wishlist.filter((item) => item.id !== id);
      setWishlisted(false);
    }

    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login to continue.");
      navigate("/login");
      return;
    }

    const cartKey = `cart_${user.email}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // If item already exists, increase quantity
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id,
        title,
        price,
        discount,
        image,
        discount,
        quantity: 1
      });

    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    // ✅ Redirect to cart page
    navigate("/cart");
  };


  // ✅ Add to Cart
  const handleAddToCart = (e) => {
    e.stopPropagation();
    //const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    const cartKey = `cart_${user.email}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    if (!cart.some((item) => item.id === id)) {
      cart.push({
        id,
        title,
        price,
        discount,
        image,
        discount,
        quantity: 1
      });

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

      <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded mb-2 relative">
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">

            {discount}% OFF
          </div>
        )}

        <img src={image} alt={title} className="max-h-full max-w-full object-contain" />
      </div>

      <h2 className="mt-2 font-semibold truncate">{title}</h2>
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
