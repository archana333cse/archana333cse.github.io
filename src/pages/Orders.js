// src/pages/Orders.js
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/orders", {
            method: "GET",
            credentials: "include", // <-- IMPORTANT
        })
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .catch((err) => console.error("Fetch orders failed", err));
    }, []);

    return (
        <div>
           {/*  <Header /> */}
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">My Orders</h1>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="border p-4 rounded mb-4">
                            <div className="text-sm text-gray-500 mb-2">
                                Order ID: {order.id} •{" "}
                                {new Date(order.created_at).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                                <strong>Address:</strong> {order.address}
                            </div>
                            {order.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 mb-2"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p>
                                            ₹{item.price} × {item.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div className="font-semibold mt-2">
                                Total: ₹{order.total_price}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
