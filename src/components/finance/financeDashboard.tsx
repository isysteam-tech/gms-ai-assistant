import React, { useState } from "react";
import ViewApplicantDetails from "./viewApplicantDetails";
import UploadApplicantDetails from "./uploadApplicantDetails";
import { BiDollarCircle } from "react-icons/bi";
import { AiOutlineEye, AiOutlineUpload, AiOutlineCheckCircle } from "react-icons/ai";
import { HiOutlineUsers, HiOutlineClock } from "react-icons/hi";
import MainHeader from "../MainHeader";
import AuditLogSection from "./auditLogSection";
import UploadButton from "../chatBot/uploadButton";

const FinanceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"view" | "upload">("view");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-30 p-6">
      {/* <div>
        <MainHeader/>
      </div> */}
      {/* Header Card */}
      <div className="flex justify-between bg-white rounded-2xl shadow-lg p-8 mb-6 border border-purple-100">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg">
            <BiDollarCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Welcome, Finance Team
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and review applicant financial details
            </p>
          </div>
        </div>
        <div>
          <UploadButton />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
        {/* Tab Navigation */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-2 flex gap-2">
          <button
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "view"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-purple-600"
            }`}
            onClick={() => setActiveTab("view")}
          >
            <div className="flex items-center justify-center gap-2">
              <AiOutlineEye className="w-5 h-5" />
              <span>View Applicant Details</span>
            </div>
          </button>
          
          <button
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "upload"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-purple-600"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            <div className="flex items-center justify-center gap-2">
              <AiOutlineUpload className="w-5 h-5" />
              <span>Upload Applicant Details</span>
            </div>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8 bg-gradient-to-br from-gray-50 to-purple-50/30 min-h-[400px]">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100/50">
            {activeTab === "view" ? (
              <ViewApplicantDetails />
            ) : (
              <UploadApplicantDetails />
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Applicants</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">1,247</p>
            </div>
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <HiOutlineUsers className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Pending Review</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">89</p>
            </div>
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center">
              <HiOutlineClock className="w-7 h-7 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Approved Today</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">34</p>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <AiOutlineCheckCircle className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>
      </div> */}

      <AuditLogSection/>
    </div>
  );
};

export default FinanceDashboard;