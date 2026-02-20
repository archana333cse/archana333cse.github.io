// src/pages/Cart.js
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart({ user }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedItems, setSavedItems] = useState([]);
  const navigate = useNavigate();

  const DELIVERY_CHARGE = 40;
  const PLATFORM_FEE = 10;

  // ✅ Fetch Cart From Database
  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/cart", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Saved Items (MOVED OUTSIDE useEffect — FIXED)
  const fetchSavedItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/saved-for-later", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch saved items");
      }

      const data = await res.json();
      setSavedItems(data);
    } catch (error) {
      console.error("Error fetching saved items:", error);
    }
  };

  // ✅ Load cart on page load
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchCart();
    fetchSavedItems();
  }, [user, navigate]);

  // ✅ Update Quantity (DB)
  const handleQuantityChange = async (id, delta) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    try {
      await fetch(`http://localhost:5000/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quantity: newQuantity }),
      });

      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // ✅ Remove Item
  const handleRemove = async (id) => {
    try {
      await fetch(`http://localhost:5000/cart/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // ✅ Move To Saved For Later
  const moveToSaved = async (id) => {
    try {
      await fetch(`http://localhost:5000/cart/save-for-later/${id}`, {
        method: "POST",
        credentials: "include",
      });

      fetchCart();
      fetchSavedItems();
    } catch (error) {
      console.error("Error moving to saved:", error);
    }
  };

  // ✅ Move Back To Cart
  const moveBackToCart = async (id) => {
    try {
      await fetch(`http://localhost:5000/saved-to-cart/${id}`, {
        method: "POST",
        credentials: "include",
      });

      fetchCart();
      fetchSavedItems();
    } catch (error) {
      console.error("Error moving back to cart:", error);
    }
  };

  // ✅ Calculations
  const priceTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountTotal = cart.reduce((sum, item) => {
    const discount = item.discount || 0;
    return sum + ((item.price * discount) / 100) * item.quantity;
  }, 0);

  const subtotal = priceTotal - discountTotal;

  const totalPrice =
    cart.length > 0
      ? subtotal + DELIVERY_CHARGE + PLATFORM_FEE
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Your Cart 🛒
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center py-10">
            Your cart is empty.
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-5">
              {cart.map((item) => {
                const discount = item.discount || 0;
                const finalPrice =
                  item.price - (item.price * discount) / 100;

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />

                      <div>
                        <h2 className="font-semibold">
                          {item.title}
                        </h2>

                        {discount > 0 ? (
                          <>
                            <p className="text-gray-400 line-through">
                              ₹{item.price}
                            </p>
                            <p className="text-green-600 font-semibold">
                              ₹{finalPrice.toFixed(0)}
                            </p>
                            <p className="text-sm text-green-600">
                              {discount}% OFF
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-700">
                            ₹{item.price}
                          </p>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, -1)
                            }
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            -
                          </button>

                          <span className="font-medium">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, 1)
                            }
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 text-sm"
                      >
                        Remove
                      </button>

                      <button
                        onClick={() => moveToSaved(item.id)}
                        className="text-blue-600 text-sm"
                      >
                        Save for Later
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Saved For Later Section */}
            {savedItems.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">
                  Saved for Later
                </h2>

                {savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b py-4"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p>₹{item.price}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => moveBackToCart(item.id)}
                      className="text-blue-600"
                    >
                      Move to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Price Details */}
            <div className="mt-8 border-t pt-6">
              <h2 className="text-lg font-bold mb-4">
                Price Details
              </h2>

              <div className="flex justify-between text-gray-700 mb-2">
                <span>Price ({cart.length} items)</span>
                <span>₹{priceTotal.toFixed(0)}</span>
              </div>

              <div className="flex justify-between text-green-600 mb-2">
                <span>Discount</span>
                <span>- ₹{discountTotal.toFixed(0)}</span>
              </div>

              <div className="flex justify-between text-gray-700 mb-2">
                <span>Delivery Charges</span>
                <span>₹{DELIVERY_CHARGE}</span>
              </div>

              <div className="flex justify-between text-gray-700 mb-2">
                <span>Platform Fee</span>
                <span>₹{PLATFORM_FEE}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-bold text-xl">
                <span>Total Amount</span>
                <span>₹{totalPrice.toFixed(0)}</span>
              </div>

              {discountTotal > 0 && (
                <p className="text-green-600 mt-3 font-medium">
                  You saved ₹{discountTotal.toFixed(0)} on this order 🎉
                </p>
              )}

              <button
                className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => navigate("/checkout/address")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}