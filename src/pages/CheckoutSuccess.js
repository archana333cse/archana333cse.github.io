// src/pages/CheckoutSuccess.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const cartKey = `cart_${user.email}`;
        const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        const address = JSON.parse(localStorage.getItem("address"));

        if (!address || cartItems.length === 0) {
            console.error("Missing address or cart items");
            return;
        }

        const total_price = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        ) + 50; // e.g., delivery + platform fees

        const fullAddress = `${address.fullName}, ${address.address}, ${address.city}, ${address.state} - ${address.pincode}`;

        fetch("http://localhost:5000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // 🔐 send JWT cookie
            body: JSON.stringify({
                user_email: user.email,
                items: cartItems,
                total_price,
                address: fullAddress,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Order saved:", data);

                // Clear cart & address
                localStorage.removeItem(cartKey);
                localStorage.removeItem("address");

                // Redirect after 2s
                setTimeout(() => {
                    navigate("/orders");
                }, 2000);
            })
            .catch((err) => console.error("Order save failed", err));
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 shadow-md text-center rounded">
                <h1 className="text-2xl font-bold text-green-600">✅ Order Placed!</h1>
                <p className="text-gray-600">Redirecting to your orders...</p>
            </div>
        </div>
    );
}
