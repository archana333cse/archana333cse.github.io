import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Payment() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // 1️⃣ Check if logged in user exists
    fetch("http://localhost:5000/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data && data.user) {
          setUserEmail(data.user.email);
        } else {
          // 2️⃣ If not logged in → check guest email
          const guestEmail = localStorage.getItem("guest_email");
          if (guestEmail) {
            setUserEmail(guestEmail);
          } else {
            alert("Please enter guest email first.");
            navigate("/guest-login");
          }
        }
      })
      .catch(() => {
        const guestEmail = localStorage.getItem("guest_email");
        if (guestEmail) {
          setUserEmail(guestEmail);
        } else {
          navigate("/login");
        }
      });
  }, [navigate]);

  const handlePayment = async (method) => {
    if (!userEmail) return;

    const cartKey = `cart_${userEmail}`;
    const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    const address = JSON.parse(localStorage.getItem("checkout_address"));

    if (!cartItems.length || !address) {
      alert("Cart or address is missing.");
      return;
    }

    localStorage.setItem("checkout_payment", method);

    const fullAddress = `${address.name}, ${address.phone}, ${address.addressLine}, ${address.city}, ${address.state} - ${address.pincode}`;

    const total_price =
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
      50;

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: cartItems,
          total_price,
          address: fullAddress,
          payment_method: method,
          email: userEmail, // ✅ IMPORTANT FOR GUEST
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem(cartKey);
        alert("Order placed successfully!");
        navigate("/checkout/confirmation");
      } else {
        alert("Order failed: " + data.message);
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex justify-center items-start bg-gray-50 p-6">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4">
          <h2 className="text-xl font-bold text-blue-600">
            Select Payment Method
          </h2>

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
