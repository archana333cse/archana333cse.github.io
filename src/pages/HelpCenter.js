import { useState } from "react";
import "./HelpCenter.css";
import { FaBox, FaCreditCard, FaUndo, FaTruck } from "react-icons/fa";

export default function HelpCenter() {
  const [selectedCategory, setSelectedCategory] = useState("Orders");
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [orderId, setOrderId] = useState("");
  const [ticket, setTicket] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const categories = [
    { name: "Orders", icon: <FaBox /> },
    { name: "Payments", icon: <FaCreditCard /> },
    { name: "Returns", icon: <FaUndo /> },
    { name: "Shipping", icon: <FaTruck /> }
  ];

  const faqs = [
    { category: "Orders", question: "How do I track my order?", answer: "Go to My Orders section and click on Track Order." },
    { category: "Orders", question: "Can I cancel my order?", answer: "Yes, you can cancel before it is shipped." },
    { category: "Payments", question: "What payment methods are available?", answer: "We accept UPI, Debit/Credit Cards, Net Banking and COD." },
    { category: "Returns", question: "How do I return a product?", answer: "Go to My Orders > Select product > Click Return." },
    { category: "Shipping", question: "How long does delivery take?", answer: "Delivery usually takes 3-7 working days." }
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.category === selectedCategory &&
      faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const handleChatSend = () => {
    if (chatMessage.trim() === "") return;
    setChatHistory([...chatHistory, chatMessage]);
    setChatMessage("");
  };

  return (
    <div className="help-page">

      {/* Sidebar */}
      <div className="help-sidebar">
        <h5>Help Topics</h5>

        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`sidebar-item ${selectedCategory === cat.name ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory(cat.name);
              setOpenIndex(null);
            }}
          >
            {cat.icon} {cat.name}
          </div>
        ))}

        <div className="contact-box">
          <h6>Need More Help?</h6>
          <button className="contact-btn">Contact Support</button>
        </div>

        <div className="tracking-box">
          <h6>Track Your Order</h6>
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button className="submit-btn">Track</button>
        </div>

        <div className="ticket-box">
          <h6>Raise a Support Ticket</h6>
          <textarea
            placeholder="Describe your issue..."
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
          />
          <button className="submit-btn">Submit Ticket</button>
        </div>
      </div>

      {/* Content */}
      <div className="help-content">

        <h4>{selectedCategory} FAQs</h4>

        <input
          type="text"
          placeholder="Search in this topic..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredFaqs.map((faq, index) => (
          <div key={faq.question} className="faq-item">
            <div
              className="faq-question"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </div>

            {openIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <p className="no-result">No FAQs found.</p>
        )}

        {/* Live Chat */}
        <div className="live-chat">
          <h5>Live Chat</h5>

          <div className="chat-messages">
            {chatHistory.map((msg, index) => (
              <div key={index} className="chat-bubble">
                {msg}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button onClick={handleChatSend}>Send</button>
          </div>
        </div>

      </div>
    </div>
  );
}
