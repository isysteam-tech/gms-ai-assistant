import React from "react";
import ChatWindow from "./chatWindow";

type DashboardProps = {
  to?: string;
  label?: string;
  className?: string;
  newTab?: boolean;
};

const Dashboard: React.FC<DashboardProps> = ({
  to = "/ChatWindow",
//   label = "Open Chat",
  className = "",
  newTab = false,
}) => {
  const handleClick = () => {
    if (newTab) {
      window.open(to, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = to;
    }
  };

  return (
    <div>
      <button type="button" onClick={handleClick} className={className}>
        {/* {label} */}
      </button>
      {/* <ChatWindow /> */}
      <></>
    </div>
  );
};

export default Dashboard;
