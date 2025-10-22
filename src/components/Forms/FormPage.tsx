import { Formik, Form } from "formik";
import { Button } from "../../ui/button";
import CompanyForm from "./companyForm";
import ContactForm from "./contactForm";
import ProjectForm from "./projectForm";
import FundingForm from "./fundingForm";
import MainHeader from "../MainHeader";
import { useNavigate } from "react-router-dom";
import icons from "../../assets/Icon.svg";
import * as Yup from "yup";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { addCommissionRate } from "../../services/FormServices";
import ApplicationProgress from "../ApplicationBar/ApplicationProgress";
import { toast } from "react-toastify";

const tabs = ["Company", "Contact", "Project", "Funding"];

const validationSchemas: Record<string, any> = {
  Company: Yup.object({
    companyName: Yup.string().required("Company Name is required"),
    uen: Yup.string().required("UEN is required"),
    address: Yup.string().required("Registered Address is required"),
    sector: Yup.string().required("Business Sector is required"),
    employeesCount: Yup.number().required("Employee Count is required"),
  }),
  Contact: Yup.object({
    contactName: Yup.string().required("Contact Name is required"),
    nricFin: Yup.string()
      .required("NRIC/FIN is required")
      .length(10, "NRIC should have exactly 10 characters"),

    emailAddress: Yup.string().email().required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    Salary: Yup.string().required("Salary is required"),
    bankaccno: Yup.string()
      .required("Bank Account Number is required")
      .length(10, "Bank Account No should have exactly 10 characters"),
    designation: Yup.string().required("Designation is required"),
    bankCode: Yup.string().required("Bank Code is required"),
  }),
  Project: Yup.object({
    projectTimeline: Yup.string().required("Project Timeline is required"),
    totalProjectCost: Yup.string().required("Total Project Cost is required"),
  }),
  Funding: Yup.object({
    projectTimeline: Yup.string().required("Project Timeline is required"),
    totalProjectCost: Yup.string().required("Total Project Cost is required"),
  }),
};

const initialValues = {
  companyName: "",
  uen: "",
  address: "",
  sector: "",
  employeesCount: "",
  contactName: "",
  nricFin: "",
  emailAddress: "",
  phoneNumber: "",
  projectTimeline: "",
  designation: "",
  totalProjectCost: "",
  projectTitle: "",
  projectDescription: "",
  requestedFundingAmount: "",
  fundingPurpose: "",
  Salary: "",
  bankaccno: "",
  bankCode: "",
};

export default function FormPage() {
  const [activeTab, setActiveTab] = useState("Company");
  const handleSubmit = async (values: any) => {
    console.log("Company Form Data:", values);

    const apiData = {
      name: values?.contactName,
      email: values?.emailAddress,
      phone: values?.phoneNumber,
      salary: values?.Salary,
      nric: values?.nricFin,
      bank_acc: values?.bankaccno,
      bank_code: values?.bankCode,
      designation: values?.designation,
      company: {
        company_name: values?.companyName,
        uen: values?.uen,
        reg_address: values?.address,
        business_sector: values?.sector,
        employee_count: values?.employeesCount,
      },
      project: {
        title: values?.projectTitle,
        desc: values?.projectDescription,
        timeline: values?.projectTimeline,
        total_cost: values?.totalProjectCost,
        funding_amount: values?.requestedFundingAmount,
      },
    };
  };

  const navigate = useNavigate();
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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[activeTab]}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ validateForm, resetForm, values, handleSubmit }) => (
            <Form>
              {/* Tabs */}

              <div className="flex gap-55 border-b pb-2 mb-6 bg-blue-100 w-full h-[60px] items-center">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={async (e) => {
                      e.preventDefault();
                      const errors = await validateForm();
                      if (Object.keys(errors).length === 0) {
                        setActiveTab(tab);
                      } else {
                        alert("Please Fill Required  Fields !");
                      }
                    }}
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

              {/* Render the current step */}
              {activeTab === "Company" && <CompanyForm />}
              {activeTab === "Contact" && <ContactForm />}
              {activeTab === "Project" && <ProjectForm />}
              {activeTab === "Funding" && <FundingForm />}

              {/* Navigation */}
              <div className="flex justify-end mt-6 gap-3">
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
                  onClick={async () => {
                    if (activeTab === "Funding") {
                      const errors = await validateForm();
                      if (Object.keys(errors).length > 0) {
                        alert(
                          "Please fill in all required fields before submitting!"
                        );
                        return;
                      }

                      const apiData = {
                        name: values.contactName,
                        email: values.emailAddress,
                        phone: values.phoneNumber,
                        salary: values.Salary,
                        nric: values.nricFin,
                        bank_acc: values.bankaccno,
                        bank_code: values.bankCode,
                        designation: values.designation,
                        company: {
                          company_name: values.companyName,
                          uen: values.uen,
                          reg_address: values.address,
                          business_sector: values.sector,
                          employee_count: values.employeesCount,
                        },
                        project: {
                          title: values.projectTitle,
                          desc: values.projectDescription,
                          timeline: values.projectTimeline,
                          total_cost: values.totalProjectCost,
                          funding_amount: values.requestedFundingAmount,
                        },
                      };

                      try {
                        await addCommissionRate(apiData);
                        toast("Form submitted successfully!");

                        navigate("/");
                      } catch (error) {
                        console.error("API error:", error);
                        toast("Error submitting form.");
                      }
                    } else {
                      const errors = await validateForm();
                      if (Object.keys(errors).length > 0) {
                        toast("Please fill required fields!");
                        return;
                      }
                      const nextIndex = tabs.indexOf(activeTab) + 1;
                      if (nextIndex < tabs.length)
                        setActiveTab(tabs[nextIndex]);
                    }
                  }}
                >
                  {activeTab === "Funding" ? "Submit" : "Next"}{" "}
                  {activeTab !== "Funding" && <MdOutlineKeyboardArrowRight />}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ApplicationProgress />
    </div>
  );
}
