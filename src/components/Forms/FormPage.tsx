import React, { useState } from "react";
import { Button } from "../../ui/button";
import CompanyForm from "./CompanyForm";
import ContactForm from "./ContactForm";
import ProjectForm from "./projectForm";
import FundingForm from "./fundingForm";

const FormPage = () => {
  const [activeTab, setActiveTab] = useState("Company");

  const tabs = ["Company", "Contact", "Project", "Funding"];

  const renderForm = () => {
    switch (activeTab) {
      case "Company":
        return <CompanyForm />;
      case "Contact":
        return <ContactForm />;
      case "Project":
        return <ProjectForm />;
      case "Funding":
        return <FundingForm />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Application Form</h1>
      <p className="text-gray-600 mb-6">
        Pre-filled with data from your conversation. Complete any missing
        fields.
      </p>

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div>{renderForm()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-end mt-6">
        <Button
          variant="outline"
          className="mr-3 rounded-full px-6"
          disabled={activeTab === "Company"}
          onClick={() =>
            setActiveTab(tabs[tabs.indexOf(activeTab) - 1] || "Company")
          }
        >
          Prev
        </Button>

        <Button
          className="bg-black text-white rounded-full px-6 hover:bg-gray-900"
          onClick={() => {
            const nextIndex = tabs.indexOf(activeTab) + 1;
            if (nextIndex < tabs.length) {
              setActiveTab(tabs[nextIndex]);
            } else {
              alert("✅ Form submitted successfully!");
            }
          }}
        >
          {activeTab === "Funding" ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default FormPage;
