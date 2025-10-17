import "./App.css";
import { Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/sideNavbar";
import Dashboard from "./components/dashboard";
import ChatWindow from "./components/chatBot/chatWindow";

const App: React.FC = () => {
  return (
    <div className="bg-black">
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<ChatWindow />} />
        </Routes>
      </SidebarLayout>
    </div>
  );
};

export default App;
