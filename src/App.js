import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GuestLogin from "./pages/GuestLogin";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Address from "./pages/Checkout/Address";
import Payment from "./pages/Checkout/Payment";
import Confirmation from "./pages/Checkout/Confirmation";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import SearchResults from "./pages/SearchResults";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import ProductListingPage from "./pages/ProductListingPage";
import Profile from "./pages/Profile";
import HelpCenter from "./pages/HelpCenter";
import AboutUs from "./pages/AboutUs";

function App() {

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // ✅ NEW

  useEffect(() => {
    fetch("http://localhost:5000/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
        setAuthLoading(false); // ✅ stop loading
      })
      .catch(() => {
        setUser(null);
        setAuthLoading(false); // ✅ stop loading
      });
  }, []);

  // ✅ IMPORTANT: wait until auth check completes
  if (authLoading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/guest" element={<GuestLogin setUser={setUser} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart user={user} />} />
          <Route path="/wishlist" element={<Wishlist user={user} />} />
          <Route path="/checkout/address" element={<Address user={user} />} />
          <Route path="/checkout/payment" element={<Payment user={user} />} />
          <Route path="/checkout/confirmation" element={<Confirmation user={user} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders user={user} />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/category/:categoryName" element={<CategoryPage user={user} />} />
          <Route path="/:mainCategory" element={<ProductListingPage user={user} />} />
          <Route path="/:mainCategory/:subCategory" element={<ProductListingPage user={user} />} />
          <Route path="/:mainCategory/:subCategory/:childCategory" element={<ProductListingPage user={user} />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;