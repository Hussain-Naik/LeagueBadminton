import * as React from "react";

interface MyButtonProps {
  label?: string;
  icon?: string;
  onClick?: () => void;
}

const MyButtons: React.FC<MyButtonProps> = ({ label, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-link inline-flex justify-content-center align-items-center text-white h-2rem w-2rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200"
    >
      <i className={icon}></i>
      {label}
    </button>
  );
};

export default MyButtons;
