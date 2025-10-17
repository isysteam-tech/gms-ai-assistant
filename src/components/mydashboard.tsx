import React from "react";

const MyDashboard = () => {
  return (
    <div className="w-1/3 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <div className="text-2xl font-bold mb-6">Dashboard</div>
      <nav>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Home</li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Profile</li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Settings</li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Logout</li>
        </ul>
      </nav>
    </div>
  );
};

export default MyDashboard;
