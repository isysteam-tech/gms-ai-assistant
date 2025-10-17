import React, { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full border-t bg-white px-6 py-4">
      <div className="flex items-center bg-gray-100 rounded-2xl shadow-sm px-4 py-3 focus-within:ring-2 focus-within:ring-blue-400">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Chat with Bot..."
          className="flex-1 bg-transparent text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-4 bg-blue-500 text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
