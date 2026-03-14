import React, { useState } from 'react';

const DEFAULT_RESPONSES = {
  hello: "Hello! I'm your personal assistant. How can I help you today?",
  hi: "Hi there! Feel free to ask me anything about the system.",
  help: "You can type things like 'how to compare cutoffs' or 'what is a cluster score?'.",
  support: "For direct support you can contact our WhatsApp line at 0743315353 or email support@kuccpscareerhub.dev",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Welcome! Type something to get started." },
  ]);
  const [input, setInput] = useState('');

  const toggleOpen = () => setOpen((o) => !o);

  const sendMessage = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((msgs) => [...msgs, { from: 'user', text }]);

    const key = text.toLowerCase().split(' ')[0];
    const reply = DEFAULT_RESPONSES[key] ||
      "I'm sorry, I don't understand. Try asking about cutoffs or cluster scores.";
    setMessages((msgs) => [...msgs, { from: 'bot', text: reply }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4">
      {open && (
        <div className="w-72 h-96 bg-white shadow-lg rounded-lg flex flex-col">
          <div className="text-white p-2 rounded-t-lg flex justify-between items-center" style={{ backgroundColor: 'var(--kuccps-red)' }}>
            <span>Assistant</span>
            <button onClick={toggleOpen} className="text-white font-bold">×</button>
          </div>
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.from === 'bot' ? 'text-left' : 'text-right'
                } text-sm`}
              >
                <span
                  className={`inline-block px-2 py-1 rounded-lg ${
                    msg.from === 'bot' ? 'bg-gray-200' : 'bg-red-100'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-2 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-2 py-1 border border-gray-300 rounded-l-lg focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="text-white px-3 rounded-r-lg" style={{ backgroundColor: 'var(--kuccps-red)' }}
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={toggleOpen}
        className="text-white p-3 rounded-full shadow-lg transition-all" style={{ backgroundColor: 'var(--kuccps-red)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--kuccps-red)'}
        title="Open assistant"
      >
        💬
      </button>
    </div>
  );
}
