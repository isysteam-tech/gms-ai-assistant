import "./App.css";
import Dashboard from "./components/dashboard";
import SidebarLayout from "./components/sideNavbar";

const App: React.FC = () => {

  return (
    <>
      <div className="bg-black">
        <SidebarLayout>
          <Dashboard />
        </SidebarLayout>
      </div>
    </>
  );
};

export default App;
