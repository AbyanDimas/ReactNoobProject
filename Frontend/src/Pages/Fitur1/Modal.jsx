import React from "react";

export const Modal = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
    <div className="relative top-1/4 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
      <div className="mt-3 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {message}
        </h3>
        <div className="mt-2 px-7 py-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);
