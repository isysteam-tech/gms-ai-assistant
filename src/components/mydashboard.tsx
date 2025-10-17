import React from "react";
import Document from  "../assets/Document.svg"
import clock from  "../assets/clock.svg"
import Dollar from  "../assets/Dollar.svg"
import Graph from  "../assets/Graph.svg"

const MyDashboard = () => {
  return (
    <div >
 <div className="w-[320px] bg-white shadow p-4 flex flex-col gap-4 rounded-2xl">
    {/* Dashboard Header */}
    <div>
      <h2 className="text-lg font-semibold">My Dashboard</h2>
      <p className="text-gray-500 text-sm">
        Track your applications, manage claims, and discover new opportunities
      </p>
    </div>

    {/* Summary Boxes */}
    <div className="flex flex-col gap-2">
  
<div className="relative flex items-center bg-gray-50 p-3 rounded-lg">
  <span className="text-3xl font-bold text-black">2</span>
  <span className="text-xs text-gray-600 ml-2 relative top-1">
    Approved Amount
  </span>


 <img 
    src={Document} 
    alt="tick" 
    className="w-3 h-3 absolute top-1 right-1"
  />
</div>

      {/* <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <span>1</span>
        <span>In Review</span>
      </div> */}

<div className="relative flex items-center bg-gray-50 p-3 rounded-lg">
  {/* Number and label */}
  <div className="flex items-center">
    <span className="text-3xl font-bold text-black">1</span>
    <span className="text-xs text-gray-600 ml-2 relative top-1">In Review</span>
  </div>

  {/* SVG icon in top-right */}
 <img 
    src={clock} 
    alt="clock" 
    className="w-3 h-3 absolute top-1 right-1"
  />
</div>

      
      {/* <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <span>$180K</span>
        <span>Approved Amount</span>
      </div> */}
      <div className="relative flex items-center bg-gray-50 p-3 rounded-lg">
  {/* Value and label */}
  <div className="flex items-center">
    <span className="text-3xl font-bold text-black">$180K</span>
    <span className="text-xs text-gray-600 ml-2 relative top-1">
      Approved Amount
    </span>
  </div>

  {/* SVG icon in top-right */}
 <img 
    src={Dollar} 
    alt="dollar" 
    className="w-3 h-3 absolute top-1 right-1"
  />
</div>

      {/* <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <span>1</span>
        <span>Pending Claims</span>
      </div> */}
      <div className="relative flex items-center bg-gray-50 p-3 rounded-lg">
  {/* Number and label */}
  <div className="flex items-center">
    <span className="text-3xl font-bold text-black">1</span>
    <span className="text-xs text-gray-600 ml-2 relative top-1">
      Pending Claims
    </span>
  </div>

  {/* SVG icon in top-right */}

 <img 
    src={Graph} 
    alt="Graph" 
    className="w-3 h-3 absolute top-1 right-1"
  />
</div>

    </div>

<hr className="-mt-2 my-2 border border-gray-100" />

    {/* My Applications */}
    <div className="flex flex-col gap-2 -mt-5">
      <h3 className="text-sm font-semibold">My Applications</h3>

      {/* <div className="flex flex-col gap-1 bg-gray-50 p-3 rounded-lg h-80">
        <p className="text-sm font-medium">Application Progress</p>
        <p className="text-gray-500 text-xs">Application ID: APP-2025-0001</p>

        <p className="text-gray-500 text-xs flex items-center gap-1">
          <span>📅</span> February 12, 2025 Estimated Completion
        </p>
        <p className="text-gray-500 text-xs flex items-center gap-1">
          <span>👤</span> Jane Lim Current Officer
        </p>
        <p className="text-gray-500 text-xs flex items-center gap-1">
          <span>⏰</span> 05/02/2025 Next Milestone
        </p>

        {/* Progress Bar */}
        {/* <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
          <div className="h-2 bg-blue-500 rounded-full w-1/3"></div>
        </div> */}
      {/* </div> */} 
      <div className="flex flex-col gap-3 bg-gray-50 p-3 rounded-lg h-80">

  <p className="text-black text-sm font-medium">
    Application Progress
  </p>


  <p className="text-gray-700 text-xs">
    Application ID: 
  </p>

    <p className="text-gray-700 text-xs">
APP-2025-0001
  </p>



  <p className="text-black text-sm font-medium">
   <span>📅</span> February 12, 2025
  </p>

 <p className="text-gray-700 text-xs">
 Estimated Completion
  </p>


  <p className="text-black text-sm font-medium ">
Jane Lim
  </p>

   <p className="text-gray-700 text-xs">
 Current Officer
  </p>


<p className="text-black text-sm font-medium ">
  <span>⏰</span> 05/02/2025
</p>

<p className="text-gray-700 text-xs ">
  Next Milestone
</p>



  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
    <div className="h-2 bg-blue-500 rounded-full w-1/3"></div>
  </div>
</div>

    </div>
  </div>
    </div>
  );
};

export default MyDashboard;
