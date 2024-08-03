import React from "react";

export const TextInput = ({ type, placeholder, value, onChange }) => (
  <div className="mb-4">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full p-2 border border-gray-300 rounded-lg"
    />
  </div>
);
