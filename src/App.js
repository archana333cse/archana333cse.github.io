// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GuestLogin from "./pages/GuestLogin";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist";
import Address from "./pages/Checkout/Address";
import Payment from "./pages/Checkout/Payment";
import Confirmation from "./pages/Checkout/Confirmation";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import SearchResults from "./pages/SearchResults";
import CheckoutSuccess from "./pages/CheckoutSuccess";


function App() {
  return (
    <Router>
      {/* Layout wrapper with margin/padding */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/guest" element={<GuestLogin />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout/address" element={<Address />} />
          <Route path="/checkout/payment" element={<Payment />} />
          <Route path="/checkout/confirmation" element={<Confirmation />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
