import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
          <div>
            <label className="font-medium">Company Name *</label>
            <Field
              name="companyName"
              className="border rounded-md w-full p-2 mt-1"
            />
            <ErrorMessage
              name="companyName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="font-medium">UEN *</label>
            <Field name="uen" className="border rounded-md w-full p-2 mt-1" />
            <ErrorMessage
              name="uen"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="font-medium">Registered Address *</label>
            <Field
              as="textarea"
              name="address"
              className="border rounded-md w-full p-2 mt-1"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Business Sector *</label>
              <Field
                name="sector"
                className="border rounded-md w-full p-2 mt-1"
              />
              <ErrorMessage
                name="sector"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="font-medium">Employee Count *</label>
              <Field
                name="employees"
                className="border rounded-md w-full p-2 mt-1"
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
