import React from 'react';

export const SimpleInput = ({ label, id, value, onChange, placeholder, required = false, className = '' }) => (
  <div className={`mb-3 ${className}`}>
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      type="text"
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
    />
  </div>
);

export const SimpleSelect = ({ label, id, value, onChange, children, required = false, className = '' }) => (
  <div className={`mb-3 ${className}`}>
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
    >
      {children}
    </select>
  </div>
);