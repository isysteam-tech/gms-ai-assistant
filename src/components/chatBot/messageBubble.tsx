import React from "react";
import botIcon from "../../assets/Text.svg";
import profileRounded from "../../assets/profileRounded.svg";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  avatar?: string;
  children?: React.ReactNode;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isUser,
  timestamp,
  avatar,
  children,
}) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && avatar && <img src={botIcon} alt="bot" />}
      <div className={`max-w-md px-4 py-2 rounded-2xl text-sm break-words ${isUser ? "bg-blue-100 text-gray-900 rounded-br-none" : "bg-gray-100 text-gray-900 rounded-bl-none shadow"}`}>
        <p>{message}</p>
        {children}
        {timestamp && (
          <div className="text-xs text-gray-400 mt-1 text-right">
            {timestamp}
          </div>
        )}
      </div>
      {isUser && avatar && <img src={profileRounded} alt="user" />}
    </div>
  );
};

export default MessageBubble;
