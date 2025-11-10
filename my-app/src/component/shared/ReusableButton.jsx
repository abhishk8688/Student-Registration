import React from 'react';

const Button = ({ children, onClick, style = 'primary', type = 'button', disabled = false, className = '' }) => {
  
  const getStyle = (s) => {
    switch (s) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500/50';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300/50';
      case 'outline':
        return 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500/50';
      case 'primary':
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500/50';
    }
  };

  const baseStyle = 'px-4 py-2 font-medium rounded-lg text-white transition duration-150 ease-in-out focus:outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const textColor = (style === 'secondary' || style === 'outline') ? '' : 'text-white';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${getStyle(style)} ${textColor} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;