import React from 'react'
import greentick from "../assets/greentick.svg"
import WhiteCircle from  "../assets/WhiteCircle.svg"

const ApplicationProgress = () => {
  return (
    <div>
          {/* Right dashboard vertical card */}
<div className="w-80 h-full bg-white rounded-3xl shadow-md p-6 space-y-6 font-sans overflow-y-auto hide-scrollbar">
      {/* Overall Completion */}
      <div>
        <p className="text-gray-700 font-medium">Application Progress</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-2xl font-bold">100%</p>
          <p className="text-gray-400 text-sm">Overall Completion</p>
        </div>
        <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
          <div className="w-full h-1 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      {/* Fast Track Lane */}
      {/* <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="font-medium text-green-700 flex items-center gap-2">
          🏃 Fast-Track Lane
        </p>
        <p className="text-sm text-green-700 mt-1">3-4 weeks • Senior Officer</p>
      </div> */}

      {/* Government API Status */}
      {/* <div>
        <p className="font-medium text-gray-700 mb-2">Government API Status</p>
        <ul className="space-y-1">
          {[
            { name: "MyInfo", value: "95%" },
            { name: "ACRA", value: "98%" },
            { name: "IRAS", value: "92%" },
            { name: "WSG", value: "100%" },
          ].map((item) => (
            <li
              key={item.name}
              className="flex justify-between items-center text-gray-600"
            >
              <span>{item.name}</span>
              <span className="flex items-center gap-1">
                {item.value} <span className="text-green-500">✔️</span>
              </span>
            </li>
          ))}
        </ul>
      </div> */}

<div className="w-65 bg-white rounded-3xl shadow-md -ml-1">
  {/* Fast-Track Lane */}
  <div className="bg-green-50 border border-green-200 rounded-t-3xl p-4">
    <p className="font-medium text-green-700 flex items-center gap-2">
      🏃 Fast-Track Lane
    </p>
    <p className="text-sm text-green-700 mt-1">3-4 weeks • Senior Officer</p>
  </div>

  {/* Government API Status */}
  <div className="p-6 space-y-6 font-sans">
    <p className="font-medium text-gray-700 mb-2">Government API Status</p>
    <ul className="space-y-1">
      {[
        { name: "MyInfo", value: "95%" },
        { name: "ACRA", value: "98%" },
        { name: "IRAS", value: "92%" },
        { name: "WSG", value: "100%" },
      ].map((item) => (
        <li
          key={item.name}
          className="flex justify-between items-center text-gray-600"
        >
          <span>{item.name}</span>
          <span className="flex items-center gap-1">
            {item.value} 
  <img src={greentick} alt="tick" className="w-3 h-3" />

          </span>
        </li>
      ))}
    </ul>
  </div>
</div>

<hr className="-mt-2 my-2 border border-gray-100" />

      {/* Stage Progress */}
      <div>
        <p className="font-medium text-gray-700 mb-2">Stage Progress</p>

        {/* Company Info */}
      
        <div className="mb-4 bg-white rounded-3xl shadow-md p-4">
  <div className="flex justify-between mb-1">
    <span>Company Information</span>
    <span>100%</span>
  </div>
  <div className="w-full h-1 bg-gray-200 rounded-full">
    <div className="w-full h-1 bg-blue-500 rounded-full"></div>
  </div>
  <ul className="mt-2 text-gray-600 text-sm space-y-1">
    <li className="flex justify-between">
      <span>UEN</span>
<span className="flex items-center gap-1">
  ACRA
  <img src={greentick} alt="tick" className="w-3 h-3" />
</span>

    </li>
    <li className="flex justify-between">
      <span>Name</span>
   <span className="flex items-center gap-1">
  ACRA
  <img src={greentick} alt="tick" className="w-3 h-3" />
</span>


    </li>
    <li className="flex justify-between">
      <span>Registered Address</span>
      {/* <span>ACRA             <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_122_12899)">
<path d="M6 11.5C8.76142 11.5 11 9.26142 11 6.5C11 3.73858 8.76142 1.5 6 1.5C3.23858 1.5 1 3.73858 1 6.5C1 9.26142 3.23858 11.5 6 11.5Z" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 6.5L5.5 7.5L7.5 5.5" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_122_12899">
<rect width="12" height="12" fill="white" transform="translate(0 0.5)"/>
</clipPath>
</defs>
</svg></span> */}
<span className="flex items-center gap-1">
  ACRA
  <img src={greentick} alt="tick" className="w-3 h-3" />
</span>

    </li>
    <li className="flex justify-between">
      <span>+4 more fields</span>
    </li>
  </ul>
</div>


        {/* Contact Person */}
    <div className="mb-4 bg-white rounded-3xl shadow-md p-4">
  <div className="flex justify-between mb-1">
    <span>Contact Person</span>
    <span>80%</span>
  </div>
  <div className="w-full h-1 bg-gray-200 rounded-full">
    <div className="w-4/5 h-1 bg-blue-500 rounded-full"></div>
  </div>
  <ul className="mt-2 text-gray-600 text-sm space-y-1">
    <li className="flex justify-between">
      <span>Name</span>
<span className="flex items-center gap-1">
  My Info
  <img src={greentick} alt="tick" className="w-3 h-3" />
</span>

    </li>
    <li className="flex justify-between">
      <span>NRIC</span>
 <span className="flex items-center gap-1">
  My Info
  <img src={greentick} alt="tick" className="w-3 h-3" />
</span>

    </li>
    <li className="flex justify-between">
      <span>Email</span>
   <span className="flex items-center gap-1">
  My Info
  <img src={greentick} alt="tick" className="w-3 h-3" />
</span>

    </li>
    <li>+2 more fields</li>
  </ul>
</div>





        {/* Project Details */}
      
          <div className="mb-4 bg-white rounded-3xl shadow-md p-4">
  <div className="flex justify-between mb-1">
    <span>Project  Details</span>
    <span>100%</span>
  </div>
  <div className="w-full h-1 bg-gray-200 rounded-full">
    <div className="w-4/5 h-1 bg-blue-500 rounded-full"></div>
  </div>
  <ul className="mt-2 text-gray-600 text-sm space-y-1">
    <li className="flex justify-between">
      <span>Title</span>
  <img src={greentick} alt="tick" className="w-3 h-3" />

    </li>
    <li className="flex justify-between">
      <span>Description</span>
 <span className="flex items-center gap-1">
Manual  
  <img src={greentick} alt="tick" className="w-3 h-3" />
</span>

    </li>
    <li className="flex justify-between">
      <span>Objectives</span>
   <span className="flex items-center gap-1">
  ai
  <img src={greentick} alt="tick" className="w-3 h-3" />
</span>

    </li>
    <li>+2 more fields</li>
  </ul>
</div>





{/* Funding & Budget */}
       <div className="mb-4 bg-white rounded-3xl shadow-md p-4">
  <div className="flex justify-between mb-1">
    <span>Funding & Budget</span>
    <span>100%</span>
  </div>
  <div className="w-full h-1 bg-gray-200 rounded-full">
    <div className="w-4/5 h-1 bg-blue-500 rounded-full"></div>
  </div>
  <ul className="mt-2 text-gray-600 text-sm space-y-1">
    <li className="flex justify-between">
      <span>Requested Amount</span>
<span className="flex items-center gap-1">
ai 
  <img src={greentick} alt="tick" className="w-3 h-3" />
</span>

    </li>
    <li className="flex justify-between">
      <span>Funding Components</span>
 <span className="flex items-center gap-1">
ai
   <img src={greentick} alt="tick" className="w-3 h-3" />
</span>

    </li>
    <li className="flex justify-between">
      <span>Objectives</span>
   <span className="flex items-center gap-1">
  ai
  <img src={greentick} alt="tick" className="w-3 h-3" />
</span>

    </li>
    <li>+2 more fields</li>
  </ul>
</div>

{/* Eligibility & Compliance */}

  <div className="mb-4 bg-white rounded-3xl shadow-md p-4">
  <div className="flex justify-between mb-1">
    <span>Eligibility & Compliance</span>
    <span>0%</span>
  </div>
  <div className="w-full h-1 bg-gray-200 rounded-full">
    <div className="w-4/5 h-1  rounded-full"></div>
  </div>
  <ul className="mt-2 text-gray-600 text-sm space-y-1">
    <li className="flex justify-between">
      <span> WSG Check</span>
<span className="flex items-center gap-1">
  <img src={WhiteCircle} alt="tick" className="w-3 h-3" />

</span>

    </li>
    <li className="flex justify-between">
      <span>CTC Statue</span>
 <span className="flex items-center gap-1">
  <img src={WhiteCircle} alt="tick" className="w-3 h-3" />

</span>

    </li>
    <li className="flex justify-between">
      <span>Union Statue</span>
   <span className="flex items-center gap-1">
  <img src={WhiteCircle} alt="tick" className="w-3 h-3" />

</span>

    </li>

  </ul>
</div>
{/* Supporting Documents */}

 <div className="mb-4 bg-white rounded-3xl shadow-md p-4">
  <div className="flex justify-between mb-1">
    <span>Supporting Documents</span>
    <span>0%</span>
  </div>
  <div className="w-full h-1 bg-gray-200 rounded-full">
    <div className="w-4/5 h-1  rounded-full"></div>
  </div>
  <ul className="mt-2 text-gray-600 text-sm space-y-1">
    <li className="flex justify-between">
      <span> Business Profile</span>
<span className="flex items-center gap-1">
  <img src={WhiteCircle} alt="tick" className="w-3 h-3" />

</span>

    </li>
    <li className="flex justify-between">
      <span>Financial Statements</span>
 <span className="flex items-center gap-1">
  <img src={WhiteCircle} alt="tick" className="w-3 h-3" />

</span>

    </li>
    <li className="flex justify-between">
      <span>Project Proposal</span>
   <span className="flex items-center gap-1">
  <img src={WhiteCircle} alt="tick" className="w-3 h-3" />

</span>

    </li>

  </ul>
</div>
      </div>
    </div>
    </div>
  )
}

export default ApplicationProgress