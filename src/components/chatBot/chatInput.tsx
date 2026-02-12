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
    { label: "Check Eligibility", width: "w-[101px]" },
    { label: "Plan Project", width: "w-[101px]" },
    { label: "Run One-Tap Verification", width: "w-[147px]" },
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
    <div className="relative p-2">
      <input
        type="text"
        placeholder="Type your message... I understand natural language!"
        className="w-full border border-gray-300 rounded-lg px-4 pb-18 pt-3 text-sm"
        onKeyDown={handleKeyDown}
        value={input}
        style={{ width: "100%" }}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Quick Actions Pills */}
      <div className="absolute bottom-4 left-3 right-3 flex flex-wrap items-center gap-2">
        {inputButtons.map((action, index) => (
          <div
            key={index}
            className={`h-6 ${action.width} rounded-full p-[1px] bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
          >
            <div className="h-full w-full bg-white rounded-full flex items-center justify-center text-black text-xs font-medium px-2 whitespace-nowrap">
              {action.label}
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <img src={zsh} alt="zsh" />
          <img src={chatLink} alt="chatLink" />
          <img src={aiSearch} alt="aiSearch" />
        </div>

        {/* Action Icons */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <img src={images} alt="images" />
          <img src={audio} alt="audio" />
          <img src={sentPlane} alt="sentPlane" />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
