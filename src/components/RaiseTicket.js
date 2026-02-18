import { useState } from "react";
import "../pages/HelpCenter.css";

export default function RaiseTicket() {
  const [message, setMessage] = useState("");

  const submitTicket = () => {
    alert("Ticket Submitted Successfully!");
    setMessage("");
  };

  return (
    <div className="ticket-box mt-4">
      <h5>Raise a Support Ticket</h5>
      <textarea
        className="form-control mb-2"
        rows="3"
        placeholder="Describe your issue..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button className="btn btn-success w-100" onClick={submitTicket}>
        Submit Ticket
      </button>
    </div>
  );
}
