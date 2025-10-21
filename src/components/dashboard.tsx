import React, { useState } from "react";
import { GrCircleAlert } from "react-icons/gr";
import aisearch from "../assets/ai-search-03.svg";
import application from "../assets/document-validation.svg";
import project from "../assets/license.svg";
import budget from "../assets/pie-chart.svg";
import document from "../assets/ai-image.svg";
import track from "../assets/code.svg";
import zsh from "../assets/zsh.svg";
import chatLink from "../assets/chatLink.svg";
import aiSearchTwo from "../assets/ai-search-02.svg";
import images from "../assets/image-02.svg";
import audio from "../assets/voice.svg";
import sentPlane from "../assets/sentPlane.svg";
import abstract from "../assets/abstract 4 1.svg";
import { useNavigate } from "react-router-dom";
import MyDashboard from "./mydashboard";
import MainHeader from "./MainHeader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isChat, setIsChat] = useState(true);

  const handleChatClick = () => {
    navigate("/chatwindow");
  };

  const features = [
    {
      img: aisearch,
      title: "Discover Grants",
      description:
        "Find and explore grants suitable for your projects and needs.",
      onClick: () => navigate("/chatWindow"),
    },
    {
      img: application,
      title: "Start Application",
      description:
        "Create a project and pre-fill Company details from documents/MyInfo.",
    },
    {
      img: project,
      title: "Project & Outcomes",
      description: "Plan Milestones with Business + Worker KPIs (CTC standard)",
    },
    {
      img: budget,
      title: "Budget & Co-funding",
      description:
        "Build a Compliant budget with caps, quotes, and guardrails.",
    },
    {
      img: document,
      title: "Document Coach",
      description: "Upload evidence: AI flags issues and suggests fixes.",
    },
    {
      img: track,
      title: "Track & Claims",
      description: "See Status, respond to clarifications, and submit claims.",
    },
  ];

  const quickActions = [
    { label: "Check Eligibility", width: "w-[101px]" },
    { label: "Plan Project", width: "w-[101px]" },
    { label: "Run One-Tap Verification", width: "w-[147px]" },
  ];

  return (
    <>
    <div className="flex">
      <div className="w-full max-h-screen bg-gray-50">
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-4 p-4 lg:p-6 max-w-[1920px] mx-auto">
          {/* Left Side - Main Content */}
          <div className="flex-1 lg:max-w-[calc(100%-352px)] 2xl:max-w-[1200px]">
            {/* Header Section */}
            <MainHeader />

            {/* Welcome Card */}
            <div className="bg-white rounded-3xl shadow-md p-6 lg:p-8">
              {/* Welcome Header */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mb-4 rounded-full flex items-center justify-center">
                  <img src={abstract} alt="abstract" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-black mb-2">
                  Welcome To The GMS InTake Assistant
                </h2>
                <p className="text-sm text-gray-700">
                  Choose A Task To Begin, You Can Switch Between Chat And Forms
                  AnyTime.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-gray-300 p-4 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer group"
                    onClick={feature.onClick}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="group-hover:scale-110 transition-transform">
                        <img src={feature.img} alt="" />
                      </div>
                      <h4 className="text-base font-semibold text-black">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Input Section */}
              <div className="relative">
                {/* Alert Message */}
                <div className="flex items-center justify-between bg-blue-50 px-4 py-3 rounded-lg mb-2">
                  <p className="text-blue-700 font-medium flex items-center gap-2 text-sm">
                    <GrCircleAlert />
                    By selecting a feature, it will make your goal easier to
                    achieve
                  </p>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-700 text-lg"
                    onClick={() => console.log("Clear message")}
                  >
                    ✕
                  </button>
                </div>

                {/* Input Field */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder='Type "start intake", paste a UEN, or drop a BizFile/ACRA PDF...'
                    className="w-full border border-gray-300 rounded-lg px-4 pb-14 pt-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  />

                  {/* Quick Actions Pills */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
                    {quickActions.map((action, index) => (
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
                      <img src={aiSearchTwo} alt="aiSearch" />
                    </div>

                    {/* Action Icons */}
                    <div className="flex-1 flex items-center justify-end gap-2">
                      <img src={images} alt="images" />
                      <img src={audio} alt="audio" />
                      <img src={sentPlane} alt="sentPlane" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex gap-4 p-4 h-screen">

          {/* <ApplicationProgress/> */}
           <MyDashboard /> 
        </div>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
