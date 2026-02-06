// src/pages/Cart.js
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart({user}) {
    const [cart, setCart] = useState([]);
    //const [user, setUser] = useState(null);

      const navigate = useNavigate();

    const DELIVERY_CHARGE = 40;
    const PLATFORM_FEE = 10;

    useEffect(() => {
    if (user) {
        const cartKey = `cart_${user.email}`;
        const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
        setCart(storedCart);
    }
}, [user]);


    const updateCart = (newCart) => {
        if (user) {
            const cartKey = `cart_${user.email}`;
            localStorage.setItem(cartKey, JSON.stringify(newCart));
            setCart(newCart);
        }
    };

    const handleQuantityChange = (id, delta) => {
        let updatedCart = cart.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        );
        updateCart(updatedCart);
    };

    const handleRemove = (id) => {
        let updatedCart = cart.filter((item) => item.id !== id);
        updateCart(updatedCart);
    };

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalPrice =
        cart.length > 0 ? subtotal + DELIVERY_CHARGE + PLATFORM_FEE : 0;

    return (
        <div>
            <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
                <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">
                    <h1 className="text-2xl font-bold text-blue-600 mb-4">Your Cart 🛒</h1>

                    {cart.length === 0 ? (
                        <p className="text-gray-600">Your cart is empty.</p>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div>
                                            <h2 className="font-semibold">{item.title}</h2>
                                            <p className="text-gray-600">₹{item.price}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="px-2 py-1 bg-gray-200 rounded"
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="px-2 py-1 bg-gray-200 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}

                            {/* Price Details */}
                            <div className="pt-4 border-t mt-4">
                                <h2 className="text-lg font-bold mb-2">Price Details</h2>
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Delivery Charges</span>
                                    <span>₹{DELIVERY_CHARGE}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Platform Fee</span>
                                    <span>₹{PLATFORM_FEE}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg mt-2">
                                    <span>Total</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                                <button
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    onClick={() => navigate("/checkout/address")}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
