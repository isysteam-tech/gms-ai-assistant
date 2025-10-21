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
  const formatMessage = (msg: string, isUser: boolean) => {
    if (!isUser && msg === "I want to apply for a grant") {
      return "Sure! To apply for a grant, please provide the following information:\n1. Your full name\n2. Project title\n3. Brief project description\n4. Estimated budget\n5. Timeline for the project\nOnce I have these details, I can help you with the application process!";
    }
    return msg;
  };
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && avatar && <img src={botIcon} alt="bot" />}
      <div className={`max-w-md px-1 py-2 rounded-2xl text-sm break-words ${isUser ? "bg-blue-100 text-gray-900 rounded-br-none" : "bg-gray-100 text-gray-900 rounded-bl-none shadow"}`}>
       <p
          dangerouslySetInnerHTML={{
            __html: formatMessage(message, isUser).replace(/\n/g, "<br/>"),
          }}
        ></p>
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
