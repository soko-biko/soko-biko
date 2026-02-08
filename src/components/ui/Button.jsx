import React from 'react';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full bg-forest-green text-white font-semibold hover:bg-opacity-90 transition-colors duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
