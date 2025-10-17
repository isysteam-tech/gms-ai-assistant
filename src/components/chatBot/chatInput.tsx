import React, { useState } from "react";
import { BsSoundwave } from "react-icons/bs";
import { IoPaperPlane } from "react-icons/io5";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState("");

  const inputButtons = ["Check Eligibility", "Plan Project", "Run One-Tap Verification"];
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
    

      <div className="flex flex-col w-full max-w-xl mx-auto">
       
      <div className="border border-gray-300 rounded-lg overflow-hidden ">
      <div>
         <input
          type="text"
          placeholder="Type your message... I understand natural language!"
          className="flex-1 px-4 py-2 outline-none"
          onKeyDown={handleKeyDown}
          value={input}
          style={{width:"100%"}}
         onChange={(e) => setInput(e.target.value)}
        />
</div>
        <div className="flex space-x-1 px-2 py-1">
          {inputButtons.map((btn) => (
            <button
              key={btn}
      className="text-sm border border-gray-300 rounded-full px-4 py-1 w-fit hover:bg-gray-100 transition whitespace-nowrap"
              style={{ height:"30%", fontSize:"11px",}}
            >
              {btn}
            </button>
          ))}
        </div>
        <div>
          <BsSoundwave />
              <IoPaperPlane  onClick={handleSend} />

</div>
      </div>

      {/* Optional: Send icon button like your screenshot */}
      {/* <div className="flex justify-end mt-2"> */}
        {/* <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"  onClick={handleSend} > */}
          {/* ➤ */}
        {/* </button> */}
      {/* </div> */}
    

    </div>
  );
};

export default ChatInput;
