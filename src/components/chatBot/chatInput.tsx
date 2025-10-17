import React, { useState } from "react";
import zsh from "../../assets/zsh.svg";
import chatLink from "../../assets/chatLink.svg";
import aiSearch from "../../assets/ai-search-02.svg";
import images from "../../assets/image-02.svg";
import audio from "../../assets/voice.svg";
import sentPlane from "../../assets/sentPlane.svg";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState("");

  const inputButtons = [
    "Check Eligibility",
    "Plan Project",
    "Run One-Tap Verification",
  ];
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
    <div className="flex flex-col w-full max-w-xl mx-auto mb-5">
      <div className="border border-gray-300 rounded-lg overflow-hidden ">
        <div>
          <input
            type="text"
            placeholder="Type your message... I understand natural language!"
            className="flex-1 px-4 py-2 outline-none"
            onKeyDown={handleKeyDown}
            value={input}
            style={{ width: "100%" }}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="flex space-x-1 px-2 py-1">
          {inputButtons.map((btn) => (
            <button
              key={btn}
              className="text-sm border border-gray-300 rounded-full px-4 py-1 w-fit hover:bg-gray-100 transition whitespace-nowrap"
              style={{ height: "30%", fontSize: "11px" }}
            >
              {btn}
            </button>
          ))} <div className="text-gray-300"> |</div>
          <img src={zsh} alt="zsh"/>
          <img src={chatLink} alt="chatlink"/>
          <img src={aiSearch} alt="aisearch"/>

          <div className="flex space-x-1 px-2 py-1 ml-7">
          <img src={images} alt="images"/>
          <img src={audio} alt="audio"/>
          <div className="text-gray-300">|</div>
          <img src={sentPlane} alt="sentPlane" onClick={handleSend} />
        </div>
        </div>
        
      </div>    
    </div>
  );
};

export default ChatInput;
