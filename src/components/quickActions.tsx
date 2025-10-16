import React from "react";

interface QuickActionsProps {
  options: string[];
  onClick: (option: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ options, onClick }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt, idx) => (
        <button
          key={idx}
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
          onClick={() => onClick(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
