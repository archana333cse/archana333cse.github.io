import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function Address() {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("checkout_address", JSON.stringify(address));
    navigate("/checkout/payment");
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex justify-center items-start bg-gray-50 p-6">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-3">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Delivery Address</h2>
          <input name="name" placeholder="Full Name" value={address.name} onChange={handleChange} className="border p-2 w-full" required />
          <input name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} className="border p-2 w-full" required />
          <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} className="border p-2 w-full" required />
          <textarea name="addressLine" placeholder="Address" value={address.addressLine} onChange={handleChange} className="border p-2 w-full" required />
          <input name="city" placeholder="City" value={address.city} onChange={handleChange} className="border p-2 w-full" required />
          <input name="state" placeholder="State" value={address.state} onChange={handleChange} className="border p-2 w-full" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Continue to Payment</button>
        </form>
      </div>
    </div>
  );
}
