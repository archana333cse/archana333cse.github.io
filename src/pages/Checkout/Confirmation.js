import Header from "../../components/Header";

export default function Confirmation() {
  const address = JSON.parse(localStorage.getItem("checkout_address"));
  const payment = localStorage.getItem("checkout_payment");

  return (
    <div>
      {/* <Header /> */}
      <div className="min-h-screen flex justify-center items-start bg-gray-50 p-6">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">🎉 Order Placed Successfully!</h1>
          <p className="mb-2">Payment Method: <strong>{payment}</strong></p>
          <p className="mb-2">Delivery Address:</p>
          <p>{address.name}, {address.addressLine}, {address.city}, {address.state} - {address.pincode}</p>
          <p className="mt-4 text-green-600 font-semibold">Thank you for shopping with us!</p>
        </div>
      </div>
    </div>
  );
}
