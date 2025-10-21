// import React, { useState, type ReactNode } from "react";
// import { BsGear } from "react-icons/bs";
// import { RiFeedbackLine, RiMenu2Line, RiCloseLine } from "react-icons/ri";
// import { FiChevronDown } from "react-icons/fi";
// import profile from "../assets/images/profile.png";
// import chatgpt from "../assets/chat-gpt.svg";
// import application from "../assets/my app.svg";
// import claims from "../assets/claims.svg";
// import saved from "../assets/saved.svg";
// import company from "../assets/company.svg";
// import history from "../assets/clock-04.svg";
// import { useNavigate } from "react-router-dom";
// import { IoIosLogOut } from "react-icons/io";

// interface SidebarLayoutProps {
//   children: ReactNode;
//   onLogout?: () => void;
// }

// const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children, onLogout }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [appOpen, setAppOpen] = useState(false);
//   const [active, setActive] = useState("Chat With Assistant");
//   const navigate = useNavigate();

//   const navItems = [
//     { icon: chatgpt, label: "Chat With Assistant", path: "/dashboard" },
//     { icon: application, label: "My Applications" },
//     { icon: claims, label: "Claims", path: "/claims" },
//     { icon: saved, label: "Saved Allowances", path: "/saved" },
//     { icon: company, label: "Company Profile", path: "/company" },
//     { icon: history, label: "History", tag: "Beta", path: "/history" },
//   ];

//   return (
//     <div className="flex h-screen bg-primary">
//       {/* ===== Sidebar ===== */}
//       <aside
//         className={`${
//           isOpen ? "w-72" : "w-20"
//         } bg-white shadow-lg transition-all duration-300 rounded-r-3xl flex flex-col justify-between`}
//       >
//         {/* --- Top Section --- */}
//         <header className="p-4">
//           <div className="flex items-center justify-between mb-8">
//             {isOpen && (
//               <h2 className="text-gray-700 font-semibold text-lg whitespace-nowrap">
//                 My Workspace
//               </h2>
//             )}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               aria-label="Toggle Sidebar"
//               className="text-gray-600 hover:text-indigo-600"
//             >
//               {isOpen ? <RiCloseLine size={22} /> : <RiMenu2Line size={26} />}
//             </button>
//           </div>

//           {/* --- Navigation --- */}
//           <nav aria-label="Main Navigation" className="space-y-2 text-gray-700 ">
//             {navItems.map((item) => (
//               <div key={item.label}>
//                 {/* My Applications Dropdown */}
//                 {item.label === "My Applications" ? (
//                   <>
//                     <button
//                       onClick={() => {
//                         setAppOpen(!appOpen);
//                         setActive(item.label);
//                       }}
//                       className={`flex items-center ${
//                         isOpen ? "justify-between" : "justify-center"
//                       } w-full p-2 rounded-xl transition-all ${
//                         active === item.label
//                           ? "bg-gradient-to-r from-[#A090E9] to-[#4D8AF1] text-white font-medium hover:opacity-90"
//                           : "hover:bg-gray-100 text-gray-700 "
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={item.icon}
//                           alt={item.label}
//                           className={`w-5 h-5 ${
//                             active === item.label
//                               ? "filter brightness-0 invert"
//                               : ""
//                           }`}
//                         />
//                         {isOpen && <span>{item.label}</span>}
//                       </div>
//                       {isOpen && (
//                         <FiChevronDown
//                           size={18}
//                           className={`transition-transform ${
//                             appOpen ? "rotate-180" : ""
//                           }`}
//                         />
//                       )}
//                     </button>

//                     {/* --- Dropdown Submenu --- */}
//                     {appOpen && isOpen && (
//                       <ul className="ml-9 mt-1 space-y-1 text-gray-600">
//                         <li>
//                           <button
//                             onClick={() => {
//                               navigate("/applications/app-source");
//                               setActive("App Source");
//                             }}
//                             className={`block text-sm w-full text-left hover:text-indigo-600 ${
//                               active === "App Source" ? "text-indigo-600" : ""
//                             }`}
//                           >
//                             App Source
//                           </button>
//                         </li>
//                         <li>
//                           <button
//                             onClick={() => {
//                               navigate("/applications/data");
//                               setActive("Data");
//                             }}
//                             className={`block text-sm w-full text-left hover:text-indigo-600 ${
//                               active === "Data" ? "text-indigo-600" : ""
//                             }`}
//                           >
//                             Data
//                           </button>
//                         </li>
//                       </ul>
//                     )}
//                   </>
//                 ) : (
//                   // Normal nav item
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setActive(item.label);
//                       if (item.path) navigate(item.path);
//                     }}
//                     className={`flex items-center gap-3 w-full p-2 rounded-xl transition-all ${
//                       isOpen ? "justify-start" : "justify-center"
//                     } ${
//                       active === item.label
//                         ? "bg-gradient-to-r from-[#A090E9] to-[#4D8AF1] text-white font-medium hover:opacity-90"
//                         : "hover:bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     <img
//                       src={item.icon}
//                       alt={item.label}
//                       className={`w-5 h-5 ${
//                         active === item.label ? "filter brightness-0 invert" : ""
//                       }`}
//                     />
//                     {isOpen && (
//                       <>
//                         <span>{item.label}</span>
//                         {item.tag && (
//                           <span className="ml-auto text-xs bg-gray-900 text-gray-200 px-2 py-0.5 rounded-full">
//                             {item.tag}
//                           </span>
//                         )}
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>
//             ))}
//           </nav>
//         </header>

//         {/* --- Bottom Section --- */}
//         <footer className="border-t border-gray-200 p-4 ">
//           <nav aria-label="Footer Navigation" className="space-y-3">
//             <button
//               type="button"
//               onClick={() => setActive("Feedback")}
//               className={`flex items-center gap-3 transition w-full ${
//                 active === "Feedback"
//                   ? "bg-gradient-to-r from-[#A090E9] to-[#4D8AF1] text-white font-medium hover:opacity-90 rounded-xl p-2"
//                   : "text-gray-600 hover:text-indigo-600"
//               } ${!isOpen && "justify-center"}`}
//             >
//               <RiFeedbackLine size={20} />
//               {isOpen && <span>Feedback</span>}
//             </button>

//             <button
//               type="button"
//               onClick={() => setActive("Settings")}
//               className={`flex items-center gap-3 transition w-full ${
//                 active === "Settings"
//                   ? "bg-gradient-to-r from-[#A090E9] to-[#4D8AF1] text-white font-medium hover:opacity-90 rounded-xl p-2"
//                   : "text-gray-600 hover:text-indigo-600"
//               } ${!isOpen && "justify-center"}`}
//             >
//               <BsGear size={20} />
//               {isOpen && <span>Settings</span>}
//             </button>

//             {/* Profile */}
//             <div
//               className={`flex items-center gap-3 mt-4 p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition ${
//                 !isOpen && "justify-center"
//               }`}
//             >
//               <img src={profile} alt="user" className="w-8 h-8 rounded-full" />
//               {isOpen && (
//                 <div>
//                   <p className="text-sm font-medium text-gray-800">
//                     Sofia Alen
//                   </p>
//                   <p className="text-xs text-gray-500">hey@agency.com</p>
//                 </div>
//               )}
//             </div>
//             {onLogout && (
//               <button
//               type="button"
//               onClick={() => setActive("")}
//               className={`flex items-center gap-3 transition w-full ${
//                 active === ""
//                   ? "bg-gradient-to-r from-[#A090E9] to-[#4D8AF1] text-white font-medium hover:opacity-90 rounded-xl p-2"
//                   : "text-gray-600 hover:text-indigo-600"
//               } ${!isOpen && "justify-center"}`}
//             >
//               <IoIosLogOut size={20} />
//               {isOpen && <span>Logout</span>}
//             </button>
//             )}
//           </nav>
//         </footer>
//       </aside>

//       {/* ===== Main Content ===== */}
//       <main className="flex-1 p-6 overflow-y-auto">{children}</main>
//     </div>
//   );
// };

// export default SidebarLayout;


// sideNavbar.tsx
import React, { useState, type ReactNode } from "react";
import { BsGear } from "react-icons/bs";
import { RiFeedbackLine, RiMenu2Line, RiCloseLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import profile from "../assets/images/profile.png";
import chatgpt from "../assets/chat-gpt.svg";
import application from "../assets/my app.svg";
import claims from "../assets/claims.svg";
import saved from "../assets/saved.svg";
import company from "../assets/company.svg";
import history from "../assets/clock-04.svg";
import { useNavigate } from "react-router-dom";

interface SidebarLayoutProps {
  children: ReactNode;
  onLogout?: () => void;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children, onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [appOpen, setAppOpen] = useState(false);
  const [active, setActive] = useState("Chat With Assistant");
  const navigate = useNavigate();

  const navItems = [
    { icon: chatgpt, label: "Chat With Assistant", path: "/dashboard" },
    { icon: application, label: "My Applications", path:"/" },
    { icon: claims, label: "Claims", path: "/", },
    { icon: saved, label: "Saved Allowances", path: "/saved" },
    { icon: company, label: "Company Profile", path: "/company" },
    { icon: history, label: "History", tag: "Beta", path: "/history" },
  ];

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="flex h-screen bg-primary">
      {/* ===== Sidebar ===== */}
      <aside
        className={`${
          isOpen ? "w-72" : "w-20"
        } bg-white shadow-lg transition-all duration-300 rounded-r-3xl flex flex-col justify-between`}
      >
        {/* --- Top Section --- */}
        <header className="p-4">
          <div className="flex items-center justify-between mb-8">
            {isOpen && (
              <h2 className="text-gray-700 font-semibold text-lg whitespace-nowrap">
                My Workspace
              </h2>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Sidebar"
              className="text-gray-600 hover:text-indigo-600"
            >
              {isOpen ? <RiCloseLine size={22} /> : <RiMenu2Line size={26} />}
            </button>
          </div>

          {/* --- Navigation --- */}
          <nav aria-label="Main Navigation" className="space-y-2 text-gray-700 ">
            {navItems.map((item) => (
              <div key={item.label}>
                {/* My Applications Dropdown */}
                {item.label === "My Applications" ? (
                  <>
                    <button
                      onClick={() => {
                        setAppOpen(!appOpen);
                        setActive(item.label);
                      }}
                      className={`flex items-center ${
                        isOpen ? "justify-between" : "justify-center"
                      } w-full p-2 rounded-xl transition-all ${
                        active === item.label
                          ? "bg-gradient-to-r from-[#A090E9] to-[#4D8AF1] text-white font-medium hover:opacity-90"
                          : "hover:bg-gray-100 text-gray-700 "
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.icon}
                          alt={item.label}
                          className={`w-5 h-5 ${
                            active === item.label
                              ? "filter brightness-0 invert"
                              : ""
                          }`}
                        />
                        {isOpen && <span>{item.label}</span>}
                      </div>
                      {isOpen && (
                        <FiChevronDown
                          size={18}
                          className={`transition-transform ${
                            appOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* --- Dropdown Submenu --- */}
                    {appOpen && isOpen && (
                      <ul className="ml-9 mt-1 space-y-1 text-gray-600">
                        <li>
                          <button
                            onClick={() => {
                              navigate("/applications/app-source");
                              setActive("App Source");
                            }}
                            className={`block text-sm w-full text-left hover:text-indigo-600 ${
                              active === "App Source" ? "text-indigo-600" : ""
                            }`}
                          >
                            App Source
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              navigate("/applications/data");
                              setActive("Data");
                            }}
                            className={`block text-sm w-full text-left hover:text-indigo-600 ${
                              active === "Data" ? "text-indigo-600" : ""
                            }`}
                          >
                            Data
                          </button>
                        </li>
                      </ul>
                    )}
                  </>
                ) : (
                  // Normal nav item
                  <button
                    type="button"
                    onClick={() => {
                      setActive(item.label);
                      if (item.path) navigate(item.path);
                    }}
                    className={`flex items-center gap-3 w-full p-2 rounded-xl transition-all ${
                      isOpen ? "justify-start" : "justify-center"
                    } ${
                      active === item.label
                        ? "bg-gradient-to-r from-[#A090E9] to-[#4D8AF1] text-white font-medium hover:opacity-90"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className={`w-5 h-5 ${
                        active === item.label ? "filter brightness-0 invert" : ""
                      }`}
                    />
                    {isOpen && (
                      <>
                        <span>{item.label}</span>
                        {item.tag && (
                          <span className="ml-auto text-xs bg-gray-900 text-gray-200 px-2 py-0.5 rounded-full">
                            {item.tag}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </header>

        {/* --- Bottom Section --- */}
        <footer className="border-t border-gray-200 p-4 ">
          <nav aria-label="Footer Navigation" className="space-y-3">
            <button
              type="button"
              onClick={() => setActive("Feedback")}
              className={`flex items-center gap-3 transition w-full ${
                active === "Feedback"
                  ? "bg-gradient-to-r from-[#A090E9] to-[#4D8AF1] text-white font-medium hover:opacity-90 rounded-xl p-2"
                  : "text-gray-600 hover:text-indigo-600"
              } ${!isOpen && "justify-center"}`}
            >
              <RiFeedbackLine size={20} />
              {isOpen && <span>Feedback</span>}
            </button>

            <button
              type="button"
              onClick={() => setActive("Settings")}
              className={`flex items-center gap-3 transition w-full ${
                active === "Settings"
                  ? "bg-gradient-to-r from-[#A090E9] to-[#4D8AF1] text-white font-medium hover:opacity-90 rounded-xl p-2"
                  : "text-gray-600 hover:text-indigo-600"
              } ${!isOpen && "justify-center"}`}
            >
              <BsGear size={20} />
              {isOpen && <span>Settings</span>}
            </button>

            {/* Profile */}
            <div
              className={`flex items-center gap-3 mt-4 p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition ${
                !isOpen && "justify-center"
              }`}
            >
              <img src={profile} alt="user" className="w-8 h-8 rounded-full" />
              {isOpen && (
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Sofia Alen
                  </p>
                  <p className="text-xs text-gray-500">hey@agency.com</p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            {onLogout && (
              <button
                type="button"
                onClick={handleLogoutClick}
                className={`flex items-center gap-3 transition w-full text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl p-2 ${
                  !isOpen && "justify-center"
                }`}
              >
                <IoIosLogOut size={20} />
                {isOpen && <span>Logout</span>}
              </button>
            )}
          </nav>
        </footer>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

export default SidebarLayout;