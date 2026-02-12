import { Field, ErrorMessage, useFormikContext } from "formik";
import { BsInfoCircleFill } from "react-icons/bs";

export default function CompanyForm() {
  return (
    <div className="grid gap-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            Company Name <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
          <Field
            name="companyName"
            className="bg-gray-100 rounded-md w-full p-2 mt-1"
            placeholder="Enter company name"
          />
          <ErrorMessage
            name="companyName"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            UEN <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
          <Field
            name="uen"
            className="bg-gray-100 rounded-md w-full p-2 mt-1"
            placeholder="Enter UEN"
          />
          <ErrorMessage
            name="uen"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="font-medium text-gray-700 flex items-center gap-1">
          Registered Address <span className="text-red-500">*</span>
          <BsInfoCircleFill className="text-gray-400" />
        </label>
        <Field
          name="address"
          as="textarea"
          className="bg-gray-100 rounded-md w-full p-2 mt-1"
          placeholder="Enter registered address"
          rows={3}
        />
        <ErrorMessage
          name="address"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            Business Sector <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
          <Field
            name="sector"
            className="bg-gray-100 rounded-md w-full p-2 mt-1"
            placeholder="Enter business sector"
          />
          <ErrorMessage
            name="sector"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            Employee Count <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
          <Field name="employeesCount">
            {({ field, form }: any) => (
              <input
                {...field}
                type="number"
                className="bg-gray-100 rounded-md w-full p-2 mt-1"
                onChange={(e) =>
                  form.setFieldValue("employeesCount", Number(e.target.value))
                }
              />
            )}
          </Field>
          <ErrorMessage
            name="employeesCount"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
