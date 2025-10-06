import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Checkout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const deliveryCharge = 40;
  const platformFee = 10;

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
      const cartKey = `cart_${loggedUser.email}`;
      const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCart(storedCart);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
  if (!address) {
    alert("Please enter your delivery address.");
    return;
  }

  const order = {
    orderId: "ORD" + Date.now(),
    items: cart,
    totalPrice,
    deliveryCharge,
    platformFee,
    address,
    paymentMethod,
    orderDate: new Date().toLocaleString(),
    status: "Processing",
  };

  const ordersKey = `orders_${user.email}`;
  let orders = JSON.parse(localStorage.getItem(ordersKey)) || [];
  orders.push(order);
  localStorage.setItem(ordersKey, JSON.stringify(orders));

  // ✅ clear cart in localStorage AND state
  const cartKey = `cart_${user.email}`;
  localStorage.setItem(cartKey, JSON.stringify([]));
  setCart([]); // clear state too

  alert("Order placed successfully!");
  navigate("/orders");
};



  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Checkout</h1>

          <h2 className="font-semibold mt-4">Delivery Address</h2>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full p-2 border rounded mt-2"
          />

          <h2 className="font-semibold mt-4">Payment Method</h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Debit/Credit Card</option>
          </select>

          <h2 className="font-semibold mt-4">Order Summary</h2>
          <p>Total Items: {cart.length}</p>
          <p>Subtotal: ₹{totalPrice}</p>
          <p>Delivery Charge: ₹{deliveryCharge}</p>
          <p>Platform Fee: ₹{platformFee}</p>
          <p className="font-bold">Total: ₹{totalPrice + deliveryCharge + platformFee}</p>

          <button
            onClick={handlePlaceOrder}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
