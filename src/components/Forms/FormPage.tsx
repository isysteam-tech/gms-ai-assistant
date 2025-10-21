import React, { useState } from "react";
import { Button } from "../../ui/button";
import CompanyForm from "./CompanyForm";
import ContactForm from "./ContactForm";
import ProjectForm from "./projectForm";
import FundingForm from "./fundingForm";
import MainHeader from "../MainHeader";
import ApplicationProgress from "../ApplicationProgress";
import { useNavigate } from "react-router-dom";
import icons from "../../assets/Icon.svg";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const FormPage = () => {
  const [activeTab, setActiveTab] = useState("Company");
  const navigate = useNavigate();

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
    <div className="flex gap-2 h-screen">
      <div className="w-full max-w-screen">
        <div>
          <MainHeader
            buttonLabel="Switch To Chat"
            icon={icons}
            onButtonClick={() => navigate("/chatwindow")}
          />
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Application Form</h1>
          <p className="text-gray-600 mb-6">
            Pre-filled with data from your conversation. Complete any missing
            fields.
          </p>

          {/* Tabs */}
          {/* <div className="flex gap-70 border-b pb-2 mb-6 bg-blue-100 w-full h-15">
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
</div> */}

          <div className="flex gap-55 border-b pb-2 mb-6 bg-blue-100 w-full h-[60px] items-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                  activeTab === tab
                    ? "relative top-1 bg-white text-blue-600 rounded-full shadow-md px-20 py-4 min-w-[100px]"
                    : "text-gray-500 hover:text-gray-700 px-4 py-2"
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
              <MdKeyboardArrowLeft /> Prev
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
              {activeTab === "Funding" ? "Submit" : "Next"}{" "}
              {activeTab !== "Funding" && <MdOutlineKeyboardArrowRight />}
            </Button>
          </div>
        </div>
      </div>
      <ApplicationProgress />
    </div>
  );
};

export default FormPage;
