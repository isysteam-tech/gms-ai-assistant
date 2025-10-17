import React from "react";

const ChatHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white shadow">
      <div>
        <h2 className="font-bold text-lg">Chat with GMS Assistant</h2>
        <p className="text-sm text-gray-500">
          Get smart recommendations, verify eligibility, and finish your grant application-end to end.
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
