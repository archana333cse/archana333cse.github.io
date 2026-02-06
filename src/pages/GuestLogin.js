// src/pages/GuestLogin.js
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function GuestLogin() {
  return (
    <>
  {/*   <Header /> */}
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Continue as Guest
        </h2>
        <p className="text-gray-600 mb-6">
          You can browse and shop without an account. For a better experience, we recommend creating one.
        </p>

        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Continue Shopping
        </button>

        <p className="text-gray-600 mt-4 text-sm">
          Want full access?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}
