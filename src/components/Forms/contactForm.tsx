import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsInfoCircleFill } from "react-icons/bs";

const ContactForm = () => {
  const validationSchema = Yup.object().shape({
     contactName: Yup.string().required("Contact Name is required"),
    nricFin: Yup.string().required("NRIC/FIN is required"),
emailAddress: Yup.string()
  .email("Please enter a valid email address")
  .required("Email Address is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),

  });

  const handleSubmit = (values: any) => {
    console.log("Company Form Data:", values);
  };

  return (
    <Formik
      initialValues={{
        contactName: "",
        nricFin: "",
        emailAddress: "",
        phoneNumber: "",
        designation:"",

      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="grid gap-4">
      <div className="flex gap-4">

  <div className="flex-1">
    <label className="font-medium text-gray-400 flex items-center gap-1">
      Contact Name <span className="text-red-500">*</span> <BsInfoCircleFill className="text-gray-400" />
    </label>
    <Field
      name="contactName"
      className="bg-gray-100 rounded-md w-full p-2 mt-1"
    />
    <ErrorMessage
      name="contactName"
      component="div"
      className="text-red-500 text-sm"
    />
  </div>

  {/* Project Description */}
  <div className="flex-1">
    <label className="font-medium text-gray-400 flex items-center gap-1">
      NRIC/FIN <span className="text-red-500">*</span> <BsInfoCircleFill className="text-gray-400" />
    </label>
    <Field

      name="nricFin"
      className="bg-gray-100 rounded-md w-full p-2 mt-1"
    />
    <ErrorMessage
      name="nricFin"
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
</div>


 

          <div className="grid grid-cols-2 gap-4">
            <div>

                           <label className="font-medium text-gray-400 flex items-center gap-1">
 Email Address <span className="text-red-500">*</span> <BsInfoCircleFill className="text-gray-400" />
</label>
          
              <Field
                name="emailAddress"
               className="bg-gray-100 rounded-md w-full p-2 mt-1"
              />
              <ErrorMessage
                name="emailAddress"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
                                 <label className="font-medium text-gray-400 flex items-center gap-1">
 Phone Number <span className="text-red-500">*</span> <BsInfoCircleFill className="text-gray-400" />
</label>
      
              <Field
                name="phoneNumber"
                className="bg-gray-100 rounded-md w-full p-2 mt-1"
                type="number"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
              <div>
                       <label className="font-medium text-gray-400 flex items-center gap-1">
              Designation <BsInfoCircleFill className="text-gray-400" />
            </label>
                        <Field
                          name="designation"
       className="bg-gray-100 rounded-md w-[1145px] p-2 mt-1"
            
                        />
                        <ErrorMessage
                          name="designation"
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

export default ContactForm;
