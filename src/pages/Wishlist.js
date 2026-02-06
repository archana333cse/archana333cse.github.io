
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist({ user }) {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    //const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    const cartKey = `cart_${user.email}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // check if item already exists in cart
    if (!cart.some((c) => c.id === item.id)) {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert("Item added to cart 🛒");
    } else {
      alert("Item already in cart.");
    }
  };

  const handleRemove = (id) => {
    //const user = JSON.parse(localStorage.getItem("user"));
    const wishlistKey = `wishlist_${user.email}`;
    let updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
  };

  return (
    <div>
     {/*  <Header /> */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.length === 0 ? (
          <p className="text-gray-600 text-lg">No items in wishlist.</p>
        ) : (
          wishlist.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded-lg flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 font-semibold truncate">{item.title}</h2>
              <p className="text-gray-600 mb-2">₹{item.price}</p>

              <button
                onClick={() => handleAddToCart(item)}
                className="w-full py-2 mb-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleRemove(item.id)}
                className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
