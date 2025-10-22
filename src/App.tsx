import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./components/sideNavbar";
import Dashboard from "./components/dashboard";
import ChatWindow from "./components/chatBot/chatWindow";
import FormPage from "./components/Forms/FormPage";
import LoginPage from "./components/loginPage";
import FinanceDashboard from "./components/finance/financeDashboard";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
          <AiOutlineLoading3Quarters className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">Loading...</p>
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
        <Route path="/dashboard" element={<FinanceDashboard />} />
        <Route path="/chatWindow" element={<ChatWindow />} />
        <Route path="/formpage" element={<FormPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </SidebarLayout>
  );
};

export default App;