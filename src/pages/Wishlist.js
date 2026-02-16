import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist({ user }) {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  // Wait until user state is available
  if (user === undefined) return;

  // If no user OR guest user → redirect
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


  const handleAddToCart = (item) => {
    if (!user) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    const cartKey = `cart_${user.email}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    if (!cart.some((c) => c.id === item.id)) {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert("Item added to cart 🛒");
    } else {
      alert("Item already in cart.");
    }
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
          My Wishlist
        </h1>
        <p className="text-gray-500 mt-1">
          {wishlist.length} item(s) saved
        </p>
      </div>

      {/* Wishlist Content */}
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
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-4 flex flex-col"
              >
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full object-contain"
                  />
                </div>

                <h2 className="mt-4 font-semibold text-gray-800 truncate">
                  {item.title}
                </h2>

                <p className="text-blue-600 font-bold mt-1">
                  ₹{item.price}
                </p>

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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}