import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsInfoCircleFill } from "react-icons/bs";

const FundingForm = () => {
  const validationSchema = Yup.object().shape({
    // projectTitle: Yup.string().required("Company Name is required"),
   // projectDescription: Yup.string().required("UEN is required"),
    projectTimeline: Yup.string().required("Project Timeline is required"),
    totalProjectCost: Yup.string().required("Total Project Cost is required"),

  });

  const handleSubmit = (values: any) => {
    console.log("Company Form Data:", values);
  };

  return (
    <Formik
      initialValues={{
        projectTitle: "",
        projectDescription: "",
        projectTimeline: "",
        totalProjectCost: "",

      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="grid gap-4">
          <div>
           <label className="font-medium text-gray-400 flex items-center gap-1">
  Requested Funding Amount <BsInfoCircleFill className="text-gray-400" />
</label>
            <Field
              name="projectTitle"
       className="bg-gray-100 rounded-md w-full p-2 mt-1"

            />
            <ErrorMessage
              name="projectTitle"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

      
        </Form>
      )}
    </Formik>
  );
};

export default FundingForm;
