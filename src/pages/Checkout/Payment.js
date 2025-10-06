import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();

  const handlePayment = (method) => {
    // Save payment method to localStorage for order confirmation
    localStorage.setItem("checkout_payment", method);

    // In real apps, integrate Razorpay/Stripe for online payments
    if (method === "COD") {
      alert("Order placed! Cash on Delivery selected.");
      navigate("/checkout/confirmation");
    } else {
      alert(`Payment via ${method} completed!`);
      navigate("/checkout/confirmation");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex justify-center items-start bg-gray-50 p-6">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4">
          <h2 className="text-xl font-bold text-blue-600">Select Payment Method</h2>
          <button onClick={() => handlePayment("UPI")} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Pay with UPI</button>
          <button onClick={() => handlePayment("Debit/Credit Card")} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Pay with Card</button>
          <button onClick={() => handlePayment("COD")} className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">Cash on Delivery</button>
        </div>
      </div>
    </div>
  );
}
