import React from "react";
import { BsRobot } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  avatar?: string;
  children?: React.ReactNode;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser, timestamp, avatar, children }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && avatar && <BsRobot />}
      <div className={`max-w-md px-4 py-2 rounded-2xl text-sm break-words ${isUser ? "bg-blue-100 text-gray-900 rounded-br-none" : "bg-gray-100 text-gray-900 rounded-bl-none shadow"}`}>
        <p>{message}</p>
        {children}
        {timestamp && <div className="text-xs text-gray-400 mt-1 text-right">{timestamp}</div>}
      </div>
      {isUser && avatar && <FaRegUserCircle />
}
    </div>
  );
};

export default MessageBubble;
