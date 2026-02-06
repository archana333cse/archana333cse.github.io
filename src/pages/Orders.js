// src/pages/Orders.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders({ user }) {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        // ✅ Protect route
        if (!user || user.isGuest) {
            alert("Please login to view your orders.");
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch("http://localhost:5000/orders", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) {
                    setOrders([]);
                    return;
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    setOrders([]);
                }

            } catch (err) {
                console.error("Fetch orders failed", err);
                setOrders([]);
            }
        };

        fetchOrders();

    }, [user, navigate]); // ✅ FIXED dependency

    return (
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

                        {order.items?.map((item, idx) => (
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
    );
}
