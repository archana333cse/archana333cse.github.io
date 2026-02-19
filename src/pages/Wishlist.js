import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist({ user }) {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) return;

    if (!user || user.isGuest) {
      alert("Please login to view your wishlist.");
      navigate("/login");
      return;
    }

    const wishlistKey = `wishlist_${user.email}`;
    const storedWishlist =
      JSON.parse(localStorage.getItem(wishlistKey)) || [];

    setWishlist(storedWishlist);
  }, [user, navigate]);

  // ✅ Add to Cart (with discount support)
  const handleAddToCart = (item) => {
    if (!user) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    const cartKey = `cart_${user.email}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingItem = cart.find((c) => c.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,       // original price
        discount: item.discount, // discount %
        quantity: 1
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert("Item added to cart 🛒");
  };

  const handleRemove = (id) => {
    const wishlistKey = `wishlist_${user.email}`;
    let updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      
      {/* Page Heading */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My Wishlist ❤️
        </h1>
        <p className="text-gray-500 mt-1">
          {wishlist.length} item(s) saved
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {wishlist.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Your wishlist is empty ❤️
            </h2>
            <p className="text-gray-500 mt-2">
              Browse products and add your favorites here.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((item) => {
              
              const discountedPrice =
                item.discount > 0
                  ? item.price - (item.price * item.discount) / 100
                  : item.price;

              return (
                <div
                  key={item.id}
                  className="relative bg-white shadow-md hover:shadow-lg transition rounded-xl p-4 flex flex-col"
                >
                  
                  {/* Discount Badge */}
                  {item.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {item.discount}% OFF
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h2 className="mt-4 font-semibold text-gray-800 truncate">
                    {item.title}
                  </h2>

                  {/* Price Section (Same as ProductCard) */}
                  <div className="mt-2">
                    {item.discount > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">
                          ₹{item.price}
                        </span>

                        <span className="text-lg font-bold text-gray-900">
                          ₹{discountedPrice.toFixed(0)}
                        </span>

                        <span className="text-green-600 text-sm font-semibold">
                          {item.discount}% OFF
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ₹{item.price}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto pt-4 space-y-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
