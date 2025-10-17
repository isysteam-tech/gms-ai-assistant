import React, { useState } from "react";
import MessageBubble from "./messageBubble";
import ChatInput from "./chatInput";
import chatGpt from "../../assets/chat-gpt.svg";
import { FaRegShareSquare } from "react-icons/fa";
import { PiDotsThreeVertical, PiLinkSimple } from "react-icons/pi";
import ApplicationProgress from "../ApplicationProgress";
// import QuickActions from "./quickActions";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
  quickActions?: string[];
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: `Hello! I'm your AI Assistant 👋  
I can help you `,
      isUser: false,
      timestamp: "",
      quickActions: [""],
    },
  ]);

  const handleSend = (text: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setMessages([...messages, { text, isUser: true, timestamp }]);

    // Mock bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: `${text}`,
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 800);
  };

  // const handleQuickAction = (option: string) => handleSend(option);

  return (
    <div className="flex gap-2 h-full">
    <div className="flex flex-col h-[90vh] w-full max-w-screen mx-auto mt-5  rounded-2xl shadow-md bg-white overflow-hidden">
      <div className="flex justify-between space-x-95 px-2 py-1 border-b border-b-gray-300">
        <div className="flex space-x-1 px-2 py-1">
          <img src={chatGpt} />
          <div className="flex space-x-2 px-2 py-1 pt-3 gap-2">
            <p>Ask your AI</p>
            <button
              type="button"
              className="text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-1.5 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 "
            >
              Beta
            </button>
          </div>{" "}
        </div>

        <div className="flex gap-2 px-2 py-1 pt-6">
          <FaRegShareSquare size={18}/>
          <PiLinkSimple size={20}/>
          <PiDotsThreeVertical size={20}/>
        </div>
      </div>
      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            message={msg.text}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
            avatar={msg.isUser ? "/user-avatar.png" : "/bot-avatar.png"}
          >
            {/* {!msg.isUser && msg.quickActions && (
              <QuickActions
                options={msg.quickActions}
                onClick={handleQuickAction}
              />
            )} */}
          </MessageBubble>
        ))}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} />
    </div>
     <ApplicationProgress />
    </div>
  );
};

export default ChatWindow;
