// src/pages/checkout/Address.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Address({ user }) {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
  });

  // ✅ Fetch Addresses
  const fetchAddresses = async () => {
    try {
      const res = await fetch("http://localhost:5000/addresses", {
        credentials: "include",
      });

      const data = await res.json();
      setAddresses(data);

      if (data.length > 0) {
        setSelectedAddress(data[0].id); // auto select first
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchAddresses();
  }, [user]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Save / Update Address
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `http://localhost:5000/addresses/${editingId}`
        : `http://localhost:5000/addresses`;

      const method = editingId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      // reset
      setForm({
        name: "",
        phone: "",
        pincode: "",
        addressLine: "",
        city: "",
        state: "",
      });
      setEditingId(null);
      setShowForm(false);

      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Edit Address
  const handleEdit = (addr) => {
    setForm(addr);
    setEditingId(addr.id);
    setShowForm(true);
  };

  // ✅ Delete Address
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/addresses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Continue to Payment
  const handleContinue = () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    localStorage.setItem("selected_address_id", selectedAddress);
    navigate("/checkout/payment");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Delivery Address
        </h1>

        {/* ================= ADDRESS LIST ================= */}
        {!showForm && addresses.length > 0 && (
          <>
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="border p-4 mb-4 rounded-lg flex justify-between"
              >
                <div>
                  <input
                    type="radio"
                    checked={selectedAddress === addr.id}
                    onChange={() => setSelectedAddress(addr.id)}
                    className="mr-2"
                  />

                  <span className="font-semibold">{addr.name}</span>

                  <p className="text-sm text-gray-600">
                    {addr.addressLine}, {addr.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-sm">{addr.phone}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(addr)}
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => setShowForm(true)}
              className="mb-4 text-blue-600 font-medium"
            >
              + Add New Address
            </button>

            <button
              onClick={handleContinue}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Continue to Payment
            </button>
          </>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!showForm && addresses.length === 0 && (
          <div className="text-center">
            <p className="mb-4 text-gray-600">
              No address found. Please add one.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Address
            </button>
          </div>
        )}

        {/* ================= FORM ================= */}
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />

            <textarea
              name="addressLine"
              placeholder="Address"
              value={form.addressLine}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />

            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />

            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              >
                {editingId ? "Update Address" : "Save Address"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="bg-gray-300 px-4 py-2 rounded w-full"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}