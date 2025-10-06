import { useState, useEffect } from "react";
import Header from "../components/Header";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

 useEffect(() => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  if (loggedUser) {
    setUser(loggedUser);
    const ordersKey = `orders_${loggedUser.email}`;  // ✅ must match Checkout.js
    const storedOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
    setOrders(storedOrders.reverse());
  }
}, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-2xl font-bold text-blue-600">Your Orders</h1>

          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order.orderId} className="bg-white shadow rounded-lg p-4">
                <h2 className="font-semibold">Order ID: {order.orderId}</h2>
                <p>Date: {order.orderDate}</p>
                <p>Payment: {order.paymentMethod}</p>
                <p>Delivery Address: {order.address}</p>
                {order.status && <p>Status: {order.status}</p>}

                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="bg-gray-100 p-2 rounded">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-24 object-cover rounded"
                      />
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p>
                        ₹{item.price} x {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-2 font-bold">
                  Total: ₹{order.totalPrice + order.deliveryCharge + order.platformFee}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
