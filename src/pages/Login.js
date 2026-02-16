
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Login({ setUser }) {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // important for sending/receiving cookies
    });

    const data = await res.json();

   if (res.ok) {
  alert("Login successful ✅");

  // Save user in localStorage
  localStorage.setItem("user", JSON.stringify(data.user));

  // Update global state
  setUser(data.user);

  navigate("/");
}
 else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
    {/*   <Header /> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Login to Your Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
