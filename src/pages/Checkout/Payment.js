import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Payment() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) {
      alert("User not logged in");
      return;
    }
    setUser(loggedUser);
  }, []);

  const handlePayment = async (method) => {
    if (!user) return;

    const cartKey = `cart_${user.email}`;
    const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    const address = JSON.parse(localStorage.getItem("checkout_address"));

    if (!cartItems.length || !address) {
      alert("Cart or address is missing.");
      return;
    }

    const fullAddress = `${address.name}, ${address.phone}, ${address.addressLine}, ${address.city}, ${address.state} - ${address.pincode}`;
    const total_price =
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
      50;

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send cookies (for authentication)
        body: JSON.stringify({
          items: cartItems,
          total_price,
          address: fullAddress,
          payment_method: method,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem(cartKey);
        alert("Order placed successfully!");
        navigate("/checkout/confirmation");
      } else {
        console.error(data);
        alert("Order failed: " + data.message);
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex justify-center items-start bg-gray-50 p-6">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4">
          <h2 className="text-xl font-bold text-blue-600">Select Payment Method</h2>
          <button
            onClick={() => handlePayment("UPI")}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Pay with UPI
          </button>
          <button
            onClick={() => handlePayment("Debit/Credit Card")}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Pay with Card
          </button>
          <button
            onClick={() => handlePayment("COD")}
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            Cash on Delivery
          </button>
        </div>
      </div>
    </div>
  );
}
