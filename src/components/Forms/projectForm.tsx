

import { Field, ErrorMessage } from "formik";
import { BsInfoCircleFill } from "react-icons/bs";

export default function ProjectForm() {
  

  return (
    <div className="grid gap-4">

      <div>
        <label className="font-medium text-gray-700 flex items-center gap-1">
          Project Title <BsInfoCircleFill className="text-gray-400" />
        </label>
        <Field
          name="projectTitle"
          className="bg-gray-100 rounded-md w-full p-2 mt-1"
          placeholder="Enter project title"
        />
        <ErrorMessage
          name="projectTitle"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>


      <div>
        <label className="font-medium text-gray-700 flex items-center gap-1">
          Project Description <BsInfoCircleFill className="text-gray-400" />
        </label>
        <Field
          as="textarea"
          name="projectDescription"
          className="bg-gray-100 rounded-md w-full p-2 mt-1"
          placeholder="Enter project description"
          rows={3}
        />
        <ErrorMessage
          name="projectDescription"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

     
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            Project Timeline <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
          <Field
            name="projectTimeline"
            className="bg-gray-100 rounded-md w-full p-2 mt-1"
            placeholder="Enter project timeline"
          />
          <ErrorMessage
            name="projectTimeline"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex-1">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            Total Project Cost <span className="text-red-500">*</span>
            <BsInfoCircleFill className="text-gray-400" />
          </label>
     

          <Field name="totalProjectCost">
  {({ field, form }: any) => (
    <input
      {...field}
      type="number"
      className="bg-gray-100 rounded-md w-full p-2 mt-1"
      onChange={(e) =>
        form.setFieldValue("totalProjectCost", Number(e.target.value))
      }
    />
  )}
</Field>
          <ErrorMessage
            name="totalProjectCost"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>


 
    </div>
  );
}

