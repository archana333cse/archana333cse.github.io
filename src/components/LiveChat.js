import { useState } from "react";
import "../pages/HelpCenter.css";


export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="chat-wrapper mt-4">

    <div className="chat-box mt-4">
      <h5>Live Chat</h5>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg.text}
          </div>
        ))}
      </div>
      <input
        className="form-control mt-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button className="btn btn-info w-100 mt-2" onClick={sendMessage}>
        Send
      </button>
    </div>
    </div>
  );
}
