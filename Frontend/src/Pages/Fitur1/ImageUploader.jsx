import React from "react";

export const ImageUploader = ({ setImage, setImagePreview }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        onChange={handleImageChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
};
