// import "./App.css";
// import { Routes, Route, Navigate } from "react-router-dom";
// import SidebarLayout from "./components/sideNavbar";
// import Dashboard from "./components/dashboard";
// import ChatWindow from "./components/chatBot/chatWindow";
// import FormPage from "./components/Forms/FormPage";
// import LoginPage from "./components/loginPage";

// const App: React.FC = () => {
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   if (!token) {
//     return (
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     );
//   }

//   return (
//     <SidebarLayout onLogout={handleLogout}>
//       <Routes>
//         <Route path="/dashboard" element={<LoginPage />} />
//         <Route path="/chatWindow" element={<ChatWindow />} />
//         <Route path="/formpage" element={<FormPage />} />
//         <Route path="*" element={<Navigate to="/dashboard" replace />} />
//       </Routes>
//     </SidebarLayout>
//   );
// };

// export default App;

// App.tsx
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./components/sideNavbar";
import Dashboard from "./components/dashboard";
import ChatWindow from "./components/chatBot/chatWindow";
import FormPage from "./components/Forms/FormPage";
import LoginPage from "./components/loginPage";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for token on component mount
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/";
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no token, show login page
  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // If token exists, show authenticated routes
  return (
    <SidebarLayout onLogout={handleLogout}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatWindow" element={<ChatWindow />} />
        <Route path="/formpage" element={<FormPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </SidebarLayout>
  );
};

export default App;