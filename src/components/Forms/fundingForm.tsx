
import { Field, ErrorMessage } from "formik";
import { BsInfoCircleFill } from "react-icons/bs";

export default function FundingForm() {
  

  return (
    <div className="grid gap-4">

      <div>
        <label className="font-medium text-gray-700 flex items-center gap-1">
          Requested Funding Amount <BsInfoCircleFill className="text-gray-400" />
        </label>
        <Field name="requestedFundingAmount">
        {({ field, form }: any) => (
          <input
            {...field}
            type="number"
            className="bg-gray-100 rounded-md w-full p-2 mt-1"
            onChange={(e) =>
              form.setFieldValue("requestedFundingAmount", Number(e.target.value))
            }
          />
        )}
      </Field>
        <ErrorMessage
          name="requestedFundingAmount"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>


      <div>
        <label className="font-medium text-gray-700 flex items-center gap-1">
          Funding Purpose <BsInfoCircleFill className="text-gray-400" />
        </label>
        <Field
          name="fundingPurpose"
          as="textarea"
          className="bg-gray-100 rounded-md w-full p-2 mt-1"
          placeholder="Enter funding purpose"
          rows={3}
        />
        <ErrorMessage
          name="fundingPurpose"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      

    </div>
  );
}
