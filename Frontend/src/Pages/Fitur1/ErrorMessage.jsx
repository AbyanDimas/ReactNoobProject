import React from "react";

export const ErrorMessage = ({ error }) => (
  error && (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 max-w-lg mx-auto"
      role="alert"
    >
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  )
);
