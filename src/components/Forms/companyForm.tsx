import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsInfoCircleFill } from "react-icons/bs";

const CompanyForm = () => {
  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Company Name is required"),
    uen: Yup.string().required("UEN is required"),
    address: Yup.string().required("Registered Address is required"),
    sector: Yup.string().required("Business Sector is required"),
    employees: Yup.number()
      .typeError("Employee Count must be a number")
      .min(1, "Must have at least 1 employee")
      .required("Employee Count is required"),
  });

  const handleSubmit = (values: any) => {
    console.log("Company Form Data:", values);
  };

  return (
    <Formik
      initialValues={{
        companyName: "",
        uen: "",
        address: "",
        sector: "",
        employees: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="grid gap-4">

               <div className="flex gap-4">
          
            <div className="flex-1">
              <label className="font-medium text-gray-400 flex items-center gap-1">
                Company Name <span className="text-red-500">*</span> <BsInfoCircleFill className="text-gray-400" />
              </label>
              <Field
                name="companyName"
                className="bg-gray-100 rounded-md w-full p-2 mt-1"
              />
              <ErrorMessage
                name="companyName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          
            {/* Project Description */}
            <div className="flex-1">
              <label className="font-medium text-gray-400 flex items-center gap-1">
                UEN <span className="text-red-500">*</span> <BsInfoCircleFill className="text-gray-400" />
              </label>
              <Field
          
                name="uen"
                className="bg-gray-100 rounded-md w-full p-2 mt-1"
              />
              <ErrorMessage
                name="uen"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
    

            <div>
                             <label className="font-medium text-gray-400 flex items-center gap-1">
                    Registered Address <span className="text-red-500">*</span> <BsInfoCircleFill className="text-gray-400" />
                  </label>
                              <Field
                                name="address"
             className="bg-gray-100 rounded-md w-[1145px] p-2 mt-1"
                       as="textarea"
                              />
                              <ErrorMessage
                                name="address"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>



       <div className="flex gap-4">
          
            <div className="flex-1">
              <label className="font-medium text-gray-400 flex items-center gap-1">
                Business Sector <span className="text-red-500">*</span> <BsInfoCircleFill className="text-gray-400" />
              </label>
              <Field
                name="sector"
                className="bg-gray-100 rounded-md w-full p-2 mt-1"
              />
              <ErrorMessage
                name="sector"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          
            {/* Project Description */}
            <div className="flex-1">
              <label className="font-medium text-gray-400 flex items-center gap-1">
                Employee Count <span className="text-red-500">*</span> <BsInfoCircleFill className="text-gray-400" />
              </label>
              <Field
          
                name="employees"
                className="bg-gray-100 rounded-md w-full p-2 mt-1"
              />
              <ErrorMessage
                name="employees"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default CompanyForm;
