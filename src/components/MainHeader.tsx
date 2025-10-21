// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { RxQuestionMarkCircled } from "react-icons/rx";
// import icon from "../assets/Icon.svg";
// import { useNavigate } from "react-router-dom";

// const MainHeader = () => {
//   const navigate = useNavigate();
//   const [isChat, setIsChat] = useState(true);

//   const handleChatClick = () => {
//     navigate("/chatwindow");
//   };

//   return (
//     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
//       <div>
//         <h1 className="text-2xl lg:text-3xl font-bold text-black">
//           Chat With GMS Assistant
//         </h1>
//         <p className="text-sm text-gray-700 mt-2">
//           Get smart recommendations, verify eligibility, and finish your grant
//           application end-to-end.
//         </p>
//       </div>

//       <div className="flex items-center gap-3">
//         <RxQuestionMarkCircled className="text-gray-700 text-4xl bg-white rounded-full p-2 shadow" />
//         <Button
//           onClick={handleChatClick}
//           variant="outline"
//           className="text-sm bg-black text-white rounded-full hover:bg-gray-900 border-0  w-40 px-4 lg:px-12 py-5 whitespace-nowrap"
//         >
//           <img src={icon} alt="symbol" className="me-2 h-5" />
//           Switch To Chat
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default MainHeader;

import React, { useState } from "react";
import { Button } from "../ui/button";
import { RxQuestionMarkCircled } from "react-icons/rx";
import icons from "../assets/Icon.svg";
import { useNavigate } from "react-router-dom";

interface MainHeaderProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  icon?: string;
  onButtonClick?: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  title = "Chat With GMS Assistant",
  subtitle = "Get smart recommendations, verify eligibility, and finish your grant application end-to-end.",
  buttonLabel = "Switch To Chat",
  icon = icons,
  onButtonClick,
}) => {
  const navigate = useNavigate();
  const [isChat, setIsChat] = useState(true);

  const handleChatClick = () => {
    // If a custom function is provided, use it.
    if (onButtonClick) {
      onButtonClick();
    } else {
      // Default navigation
      navigate("/chatwindow");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-black">{title}</h1>
        <p className="text-sm text-gray-700 mt-2">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <RxQuestionMarkCircled className="text-gray-700 text-4xl bg-white rounded-full p-2 shadow" />
        <Button
          onClick={handleChatClick}
          variant="outline"
          className="text-sm bg-black text-white rounded-full hover:bg-gray-900 border-0 w-40 px-4 lg:px-12 py-5 whitespace-nowrap"
        >
          <img src={icon} alt="symbol" className="me-2 h-5" />
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default MainHeader;
