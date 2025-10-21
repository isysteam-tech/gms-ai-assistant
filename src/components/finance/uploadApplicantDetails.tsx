import React from "react";

const UploadApplicantDetails: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-700">
      <div className="flex w-full max-w-md items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Upload here"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadApplicantDetails;
