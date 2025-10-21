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
    }else if (!isUser && msg === "I need to submit a claim") {
      return "No problem! To submit a claim, please provide the following information:\n1. Your full name\n2. Claim reference number\n3. Date of the expense\n4. Amount to be claimed\n5. Description of the expense\nOnce I have these details, I can guide you through the claim submission process!";
    }else if (!isUser && msg === "Help me find suitable funding") {
      return "I'd be happy to help you find suitable funding options! Please provide me with some details about your project, such as the industry, project size, and any specific requirements you have. This will help me recommend the best funding opportunities for you.";     
    }else if (!isUser && msg === "I have a question about my application") {
      return "Of course! Please go ahead and ask your question about your application. I'll do my best to assist you with any information or guidance you need.";
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
