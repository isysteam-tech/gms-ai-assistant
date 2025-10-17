import React from "react";
import { Button } from "../ui/button";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { GrCircleAlert } from "react-icons/gr";
import aisearch from "../assets/ai-search-03.svg";
import application from "../assets/document-validation.svg";
import project from "../assets/license.svg";
import budget from "../assets/pie-chart.svg";
import document from "../assets/ai-image.svg";
import track from "../assets/code.svg";
import icon from "../assets/Icon.svg";
import zsh from "../assets/zsh.svg";
import chatLink from "../assets/chatLink.svg";
import aiSearchTwo from "../assets/ai-search-02.svg";
import images from "../assets/image-02.svg";
import audio from "../assets/voice.svg";
import sentPlane from "../assets/sentPlane.svg";
import abstract from "../assets/abstract 4 1.svg";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

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
      <div className="w-full max-h-screen bg-gray-50">
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-4 p-4 lg:p-6 max-w-[1920px] mx-auto">
          {/* Left Side - Main Content */}
          <div className="flex-1 lg:max-w-[calc(100%-352px)] 2xl:max-w-[1200px]">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-black">
                  Chat With GMS Assistant
                </h1>
                <p className="text-sm text-gray-700 mt-2">
                  Get smart recommendations, verify eligibility, and finish your
                  grant application end-to-end.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <RxQuestionMarkCircled className="text-gray-700 text-4xl bg-white rounded-full p-2 shadow cursor-pointer hover:shadow-md transition-shadow" />
                <Button
                  variant="outline"
                  className="text-sm bg-black text-white rounded-full hover:bg-gray-900 border-0 px-8 lg:px-12 py-5 whitespace-nowrap"
                >
                  <img src={icon} alt="symbol" className="me-2 h-5" />
                  Switch To Chat
                </Button>
              </div>
            </div>

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

          {/* Right Side - Dashboard Card */}
          <div className="w-full lg:w-[336px] lg:min-w-[336px] 2xl:w-[400px]">
            <div className="bg-white shadow-lg rounded-2xl p-5 lg:p-6 sticky top-6">
              {/* Dashboard Header */}
              <div className="mb-5">
                <h2 className="text-lg lg:text-xl font-semibold text-black mb-2">
                  My Dashboard
                </h2>
                <p className="text-gray-500 text-xs lg:text-sm">
                  Track your applications, manage claims, and discover new
                  opportunities
                </p>
              </div>

              {/* Summary Boxes */}
              <div className="grid grid-cols gap-2 mb-5">
                {[
                  { value: "2", label: "Approved Amount" },
                  { value: "1", label: "In Review" },
                  { value: "$180K", label: "Approved Amount" },
                  { value: "1", label: "Pending Claims" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 flex p-3 rounded-lg gap-2 items-center hover:bg-gray-100 transition-colors"
                  >
                    <p className="text-lg lg:text-xl font-bold text-black">
                      {item.value}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>

              <hr className="my-5 border-gray-200" />

              {/* My Applications */}
              <div>
                <h3 className="text-sm lg:text-base font-semibold text-black mb-4">
                  My Applications
                </h3>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl space-y-4">
                  <p className="text-sm font-semibold text-black">
                    Application Progress
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">
                        Application ID
                      </p>
                      <p className="text-sm font-medium text-black">
                        APP-2025-0001
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black flex items-center gap-2">
                        <span>📅</span> February 12, 2025
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Estimated Completion
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black">Jane Lim</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Current Officer
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black flex items-center gap-2">
                        <span>⏰</span> 05/02/2025
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Next Milestone
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>33%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: "33%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
