import React, { useState } from "react";
import ChatHeader from "./chatHeader";
import MessageBubble from "./messageBubble";
import ChatInput from "./chatInput";
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
      quickActions: [
        "",
      ],
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
    <div className="flex flex-col h-[90vh] w-full max-w-2xl mx-auto mt-5 border rounded-2xl shadow-md bg-white overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <ChatHeader />
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
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
  );
};

export default ChatWindow;
