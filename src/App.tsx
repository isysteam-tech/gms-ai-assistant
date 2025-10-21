import "./App.css";
import { Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/sideNavbar";
import Dashboard from "./components/dashboard";
import ChatWindow from "./components/chatBot/chatWindow";
import FormPage from "./components/Forms/FormPage";

const App: React.FC = () => {
  return (
    <div>
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chatWindow" element={<ChatWindow />} />
          <Route path="/formpage" element={<FormPage />} />
        </Routes>
      </SidebarLayout>
    </div>
  );
};

export default App;
