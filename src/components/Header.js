// src/components/Header.js
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Search, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Header({ user, setUser }) {
   const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
   const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  
  const handleLogout = async () => {
  try {
    await axios.post(
      "http://localhost:5000/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    navigate("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          🛍️ MyRetail
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-6">
         <input
        type="text"
        placeholder="Search for products, brands and more"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-l-full border border-gray-300"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 rounded-r-full"
      >
        <Search size={20} />
      </button>
        </div>

        {/* Nav + Icons */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            {user && (
            <Link to="/orders" className="hover:text-blue-600">
              My Orders
            </Link>
          )}
          </nav>
          

          {/* Wishlist + Cart */}
          <div className="flex items-center gap-4 text-gray-700">
            <Link to="/wishlist" className="hover:text-blue-600">
              <Heart size={22} />
            </Link>
            <Link to="/cart" className="hover:text-blue-600">
              <ShoppingCart size={22} />
            </Link>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <User size={22} />
                <span className="hidden md:inline">
                  {user ? `Hi, ${user.fullName?.split(" ")[0]}` : "Login"}
                </span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 z-50">
                  {user ? (
                    <>
                      <span className="block px-4 py-2 text-sm text-gray-700">
                        {user.fullName}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Sign Up
                      </Link>
                      <Link
                        to="/guest"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Continue as Guest
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="flex md:hidden px-4 pb-3">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white px-4 rounded-r-full hover:bg-blue-700">
          <Search size={20} />
        </button>
      </div>
    </header>
  );
}
