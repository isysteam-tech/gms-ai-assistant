import { Field, ErrorMessage } from "formik";
import { BsInfoCircleFill } from "react-icons/bs";

const ContactForm  = () =>

{


  return (
    <div className="grid gap-4">
      {/* Row 1: Contact Name & NRIC/FIN */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            Contact Name <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
          <Field
            name="contactName"
            className="bg-gray-100 rounded-md w-full p-2 mt-1"
            placeholder="Enter contact name"
          />
          <ErrorMessage
            name="contactName"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            NRIC/FIN <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
          <Field
            name="nricFin"
            className="bg-gray-100 rounded-md w-full p-2 mt-1"
            placeholder="Enter NRIC/FIN"
          />
          <ErrorMessage
            name="nricFin"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      {/* Row 2: Email Address & Phone Number */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            Email Address <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
          <Field
            name="emailAddress"
            type="email"
            className="bg-gray-100 rounded-md w-full p-2 mt-1"
            placeholder="Enter email"
          />
          <ErrorMessage
            name="emailAddress"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            Phone Number <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
          <Field
            name="phoneNumber"
            className="bg-gray-100 rounded-md w-full p-2 mt-1"
            placeholder="Enter phone number"
          />
          <ErrorMessage
            name="phoneNumber"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>



  <div className="flex gap-4">
        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
          Salary <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
      <Field name="Salary">
      {({ field, form }: any) => (
        <input
          {...field}
          type="number"
          className="bg-gray-100 rounded-md w-full p-2 mt-1"
          onChange={(e) =>
            form.setFieldValue("Salary", Number(e.target.value))
          }
              placeholder="Enter Salary"
        />
      )}
    </Field>
          <ErrorMessage
            name="Salary"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            Bank Account Number <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
          <Field
            name="bankaccno"

            className="bg-gray-100 rounded-md w-full p-2 mt-1"
            placeholder="Enter Bank Account Number"
          />
          <ErrorMessage
            name="bankaccno"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>


        <div className="flex gap-4">
        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
          Designation <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
  <Field
          name="designation"
          className="bg-gray-100 rounded-md w-full p-2 mt-1"
          placeholder="Enter designation"
        />
        <ErrorMessage
          name="designation"
          component="div"
          className="text-red-500 text-sm"
        />
        </div>

        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            Bank Code <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
          <Field
            name="bankCode"
            className="bg-gray-100 rounded-md w-full p-2 mt-1"
            placeholder="Enter Bank Code"
          />
          <ErrorMessage
            name="bankCode"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
      {/* Row 3: Designation */}
 

      {/* Optional: Debug current values */}
   
    </div>
  );
}


export default ContactForm;