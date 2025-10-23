// import React, { useState } from "react";
// import MessageBubble from "./messageBubble";
// import ChatInput from "./chatInput";
// import chatGpt from "../../assets/chat-gpt.svg";
// import { FaRegShareSquare } from "react-icons/fa";
// import { PiDotsThreeVertical, PiLinkSimple } from "react-icons/pi";
// import { FiChevronDown } from "react-icons/fi";
// import { BsStars } from "react-icons/bs";
// import { SiOpenai, SiGooglegemini, SiAnthropic } from "react-icons/si";
// import ApplicationProgress from "../ApplicationBar/ApplicationProgress";
// import MainHeader from "../MainHeader";
// import flash from '../../assets/flash.svg'
// import { useNavigate } from "react-router-dom";
// import QuickActions from "./quickActions";

// interface Message {
//   text: string;
//   isUser: boolean;
//   timestamp: string;
//   quickActions?: string[];
// }

// type AIModel = "claude" | "chatgpt" | "gemini";

// interface AIModelOption {
//   id: AIModel;
//   name: string;
//   icon: React.ReactNode;
//   color: string;
// }

// const ChatWindow: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       text: "🤖Hello! I'm your AI Assistant <br/> I can help you with: <br/>"+
//        "● 🏢Grant Applications - Apply for funding with government API integration <br/>"+ 
//       "● 💰Claim Submissions - Submit milestone and reimbursement claims <br/>"+
//        "●❓General Assistance - Answer questions about grants and processes <br/>"+
//        "What would you like to do today? You can simply tell me in your own words!",
//       isUser: false,
//       timestamp: "",
//       quickActions: ["I want to apply for a grant", "I need to submit a claim", "Help me find suitable funding", "I have a question about my application"],
//     },
//   ]);

//   const [selectedModel, setSelectedModel] = useState<AIModel>("chatgpt");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const navigate = useNavigate();

//   const aiModels: AIModelOption[] = [
//     {
//       id: "claude",
//       name: "Claude",
//       icon: <SiAnthropic className="w-5 h-5" />,
//       color: "text-orange-600"
//     },
//     {
//       id: "chatgpt",
//       name: "ChatGPT",
//       icon: <SiOpenai className="w-5 h-5" />,
//       color: "text-green-600"
//     },
//     {
//       id: "gemini",
//       name: "Gemini",
//       icon: <SiGooglegemini className="w-5 h-5" />,
//       color: "text-blue-600"
//     }
//   ];

//   const currentModel = aiModels.find(model => model.id === selectedModel)!;

//   const handleSend = (text: string) => {
//     const timestamp = new Date().toLocaleTimeString();
//     setMessages([...messages, { text, isUser: true, timestamp }]);

//     // Mock bot reply with selected AI model
//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           text: `[${currentModel.name}] ${text}`,
//           isUser: false,
//           timestamp: new Date().toLocaleTimeString(),
//         },
//       ]);
//     }, 800);
//   };

//   const handleQuickAction = (option: string) => handleSend(option);

//   const handleModelChange = (modelId: AIModel) => {
//     setSelectedModel(modelId);
//     setIsDropdownOpen(false);
//   };

//   return (
//     <div className="flex gap-2 h-screen">
//       <div className="w-full max-w-screen">
//         <div>
//            <MainHeader
//           buttonLabel="Switch To Form"
//           icon={flash}
//           onButtonClick={() => navigate("/formpage")}
//         />
//         </div>
//         <div className="flex flex-col h-[85vh] w-full max-w-screen mx-auto mt-5 rounded-2xl shadow-md bg-white overflow-hidden">
//           <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
//             <div className="flex items-center gap-3">
//               <img src={chatGpt} alt="Chat" className="w-8 h-8" />
              
//               {/* AI Model Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
//                 >
//                   <span className={currentModel.color}>
//                     {currentModel.icon}
//                   </span>
//                   <span className="font-medium text-gray-700">
//                     Ask your AI - {currentModel.name}
//                   </span>
//                   <FiChevronDown 
//                     className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
//                       isDropdownOpen ? 'rotate-180' : ''
//                     }`} 
//                   />
//                 </button>

//                 {/* Dropdown Menu */}
//                 {isDropdownOpen && (
//                   <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
//                     <div className="py-1">
//                       {aiModels.map((model) => (
//                         <button
//                           key={model.id}
//                           onClick={() => handleModelChange(model.id)}
//                           className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors duration-150 ${
//                             selectedModel === model.id ? 'bg-purple-50 border-l-4 border-purple-600' : ''
//                           }`}
//                         >
//                           <span className={model.color}>
//                             {model.icon}
//                           </span>
//                           <div className="flex-1 text-left">
//                             <p className="font-medium text-gray-800">{model.name}</p>
//                             <p className="text-xs text-gray-500">
//                               {model.id === 'claude' && 'Anthropic AI'}
//                               {model.id === 'chatgpt' && 'OpenAI GPT-4'}
//                               {model.id === 'gemini' && 'Google AI'}
//                             </p>
//                           </div>
//                           {selectedModel === model.id && (
//                             <BsStars className="w-4 h-4 text-purple-600" />
//                           )}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 className="text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium rounded-lg text-sm px-3 py-1.5 transition-colors duration-200"
//               >
//                 Beta
//               </button>
//             </div>

//             <div className="flex gap-4 items-center text-gray-600">
//               <button className="hover:text-purple-600 transition-colors duration-200">
//                 <FaRegShareSquare size={18} />
//               </button>
//               <button className="hover:text-purple-600 transition-colors duration-200">
//                 <PiLinkSimple size={20} />
//               </button>
//               <button className="hover:text-purple-600 transition-colors duration-200">
//                 <PiDotsThreeVertical size={20} />
//               </button>
//             </div>
//           </div>

//           {/* Messages Section */}
//           <div className="flex-1 overflow-y-auto px-4 py-6">
//             {messages.map((msg, idx) => (
//               <MessageBubble
//                 key={idx}
//                 message={msg.text}
//                 isUser={msg.isUser}
//                 timestamp={msg.timestamp}
//                 avatar={msg.isUser ? "/user-avatar.png" : "/bot-avatar.png"}
//               >
//                 {!msg.isUser && msg.quickActions && (
//               <QuickActions
//                 options={msg.quickActions}
//                 onClick={handleQuickAction}
//               />
//             )}
//               </MessageBubble>
//             ))}
//           </div>

//           {/* Input */}
//           <ChatInput onSend={handleSend} />
//         </div>
//       </div>
//       <ApplicationProgress />
//     </div>
//   );
// };

// export default ChatWindow;

import React, { useState } from "react";
import axios from "axios";
import MessageBubble from "./messageBubble";
import ChatInput from "./chatInput";
import chatGpt from "../../assets/chat-gpt.svg";
import { FaRegShareSquare } from "react-icons/fa";
import { PiDotsThreeVertical, PiLinkSimple } from "react-icons/pi";
import { FiChevronDown } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { SiOpenai, SiGooglegemini, SiAnthropic } from "react-icons/si";
import ApplicationProgress from "../ApplicationBar/ApplicationProgress";
import MainHeader from "../MainHeader";
import flash from "../../assets/flash.svg";
import { useNavigate } from "react-router-dom";
import QuickActions from "./quickActions";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
  quickActions?: string[];
}

type AIModel = "claude" | "chatgpt" | "gemini";

interface AIModelOption {
  id: AIModel;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text:
        "🤖Hello! I'm your AI Assistant <br/> I can help you with: <br/>" +
        "● 🏢Grant Applications - Apply for funding with government API integration <br/>" +
        "● 💰Claim Submissions - Submit milestone and reimbursement claims <br/>" +
        "●❓General Assistance - Answer questions about grants and processes <br/>" +
        "What would you like to do today? You can simply tell me in your own words!",
      isUser: false,
      timestamp: "",
      quickActions: [
        "I want to apply for a grant",
        "I need to submit a claim",
        "Help me find suitable funding",
        "I have a question about my application",
      ],
    },
  ]);

  const [selectedModel, setSelectedModel] = useState<AIModel>("chatgpt"); // default to ChatGPT
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const aiModels: AIModelOption[] = [
    {
      id: "claude",
      name: "Claude",
      icon: <SiAnthropic className="w-5 h-5" />,
      color: "text-orange-600",
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      icon: <SiOpenai className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      id: "gemini",
      name: "Gemini",
      icon: <SiGooglegemini className="w-5 h-5" />,
      color: "text-blue-600",
    },
  ];

  const currentModel = aiModels.find((model) => model.id === selectedModel)!;

  // API BASE URL (adjust if needed)
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:3000/gms-core/ai"; // your backend URL

  // Handle sending message and calling backend
  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const timestamp = new Date().toLocaleTimeString();

    // Add user message immediately
    setMessages((prev) => [...prev, { text, isUser: true, timestamp }]);
    setLoading(true);

    try {
      // Call backend API
      const response = await axios.post(`${API_BASE_URL}/ask`, {
        question: text,
        model: selectedModel,
      });

      const aiReply = response.data?.answer || "I don't know.";

      // Add AI message
      setMessages((prev) => [
        ...prev,
        {
          text: aiReply,
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error: any) {
      console.error("AI API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text:
            "⚠️ Sorry, I couldn't reach the AI service. Please try again later.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (option: string) => handleSend(option);

  const handleModelChange = (modelId: AIModel) => {
    setSelectedModel(modelId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex gap-2 h-screen">
      <div className="w-full max-w-screen">
        <div>
          <MainHeader
            buttonLabel="Switch To Form"
            icon={flash}
            onButtonClick={() => navigate("/formpage")}
          />
        </div>

        <div className="flex flex-col h-[85vh] w-full max-w-screen mx-auto mt-5 rounded-2xl shadow-md bg-white overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <img src={chatGpt} alt="Chat" className="w-8 h-8" />

              {/* AI Model Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                >
                  <span className={currentModel.color}>
                    {currentModel.icon}
                  </span>
                  <span className="font-medium text-gray-700">
                    Ask your AI - {currentModel.name}
                  </span>
                  <FiChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="py-1">
                      {aiModels.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => handleModelChange(model.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors duration-150 ${
                            selectedModel === model.id
                              ? "bg-purple-50 border-l-4 border-purple-600"
                              : ""
                          }`}
                        >
                          <span className={model.color}>{model.icon}</span>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-gray-800">
                              {model.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {model.id === "claude" && "Anthropic AI"}
                              {model.id === "chatgpt" && "OpenAI GPT-4"}
                              {model.id === "gemini" && "Google AI"}
                            </p>
                          </div>
                          {selectedModel === model.id && (
                            <BsStars className="w-4 h-4 text-purple-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium rounded-lg text-sm px-3 py-1.5 transition-colors duration-200"
              >
                Beta
              </button>
            </div>

            <div className="flex gap-4 items-center text-gray-600">
              <button className="hover:text-purple-600 transition-colors duration-200">
                <FaRegShareSquare size={18} />
              </button>
              <button className="hover:text-purple-600 transition-colors duration-200">
                <PiLinkSimple size={20} />
              </button>
              <button className="hover:text-purple-600 transition-colors duration-200">
                <PiDotsThreeVertical size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {messages.map((msg, idx) => (
              <MessageBubble
                key={idx}
                message={msg.text}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
                avatar={msg.isUser ? "/user-avatar.png" : "/bot-avatar.png"}
              >
                {!msg.isUser && msg.quickActions && (
                  <QuickActions
                    options={msg.quickActions}
                    onClick={handleQuickAction}
                  />
                )}
              </MessageBubble>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="text-gray-500 italic mt-2 animate-pulse">
                AI is thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <ChatInput onSend={handleSend} />
        </div>
      </div>
      <ApplicationProgress />
    </div>
  );
};

export default ChatWindow;
