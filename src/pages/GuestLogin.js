// src/pages/GuestLogin.js
import { Link, useNavigate } from "react-router-dom";

export default function GuestLogin({ setUser }) {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    // Create unique guest email (important)
    const guestEmail = `guest_${Date.now()}@example.com`;

    const guestUser = {
      email: guestEmail,
      name: "Guest",
      isGuest: true,
    };

    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(guestUser));
    localStorage.setItem("guest_email", guestEmail); // ✅ important for Payment page

    // Update global state
    setUser(guestUser);

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Continue as Guest
        </h2>

        <p className="text-gray-600 mb-6">
          You can browse and shop without creating an account.
        </p>

        <button
          onClick={handleGuestLogin}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>

        <p className="text-gray-600 mt-4 text-sm">
          Want full access?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
