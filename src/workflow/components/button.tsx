import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: String;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-5 w-32 h-12 bg-blue-500 text-white rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition"
    >
      {label}
    </button>
  );
};

export default Button;
