import { useState } from "react";
import "../pages/HelpCenter.css";

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");

  const trackOrder = () => {
    if (orderId === "123") {
      setStatus("Your order is Shipped 🚚");
    } else {
      setStatus("Order not found ❌");
    }
  };

  return (
    <div className="tracking-box">
      <h5>Track Your Order</h5>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button className="btn btn-primary w-100" onClick={trackOrder}>
        Track
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
}
