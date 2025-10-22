import React, { useState } from "react";
import ViewApplicantDetails from "./viewApplicantDetails";
import UploadApplicantDetails from "./uploadApplicantDetails";

const FinanceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"view" | "upload">("view");

  return (
    <div className="p-8 border border-blue-300 rounded-md bg-white shadow-sm max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">Welcome Finance Team,</h1>

      <div className="flex mb-4">
        <button
          className={`px-6 py-2 rounded-t-md font-medium ${
            activeTab === "view"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setActiveTab("view")}
        >
          View Applicant Details
        </button>
        <button
          className={`px-6 py-2 rounded-t-md font-medium ml-2 ${
            activeTab === "upload"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setActiveTab("upload")}
        >
          Upload Applicant Details
        </button>
      </div>
      <div className="border rounded-b-md rounded-tr-md p-4 bg-gray-50">
        {activeTab === "view" ? (
          <ViewApplicantDetails />
        ) : (
          <UploadApplicantDetails />
        )}
      </div>
    </div>
  );
};

export default FinanceDashboard;
