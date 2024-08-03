import React, { useState } from "react";
import axios from "axios";
import { ImageUploader } from "./Fitur1/ImageUploader";
import { ErrorMessage } from "./Fitur1/ErrorMessage";
import { TextInput } from "./Fitur1/TextInput";
import { Modal } from "./Fitur1/Modal";
import { ConfirmModal } from "./Fitur1/ConfirmModal";

function Home1() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the name and role already exist
    axios.get(`http://localhost:5000/api/osis?name=${name}&role=${role}`)
      .then(response => {
        if (response.data.exists) {
          setError("Nama dan role sudah ada. Silakan gunakan nama atau role yang berbeda.");
        } else {
          setShowConfirmModal(true);
        }
      })
      .catch(error => {
        console.error("There was an error checking the existing data:", error);
        setError("There was an error checking the existing data. Please try again later.");
      });
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("age", age);
    formData.append("image", image);

    axios.post("http://localhost:5000/api/osis", formData)
      .then(response => {
        setError(null);
        setName("");
        setRole("");
        setAge("");
        setImage(null);
        setImagePreview(null);
        setModalMessage("Data berhasil dikirim!");
      })
      .catch(error => {
        console.error("There was an error posting the new OSIS data:", error);
        setError("There was an error adding the new OSIS member. Please try again later.");
      });
  };

  const handleCloseModal = () => {
    setModalMessage(null);
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Data Pengurus OSIS</h1>
      <ErrorMessage error={error} />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mb-6">
        <TextInput type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextInput type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
        <TextInput type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <ImageUploader setImage={setImage} setImagePreview={setImagePreview} />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-2 rounded-lg max-h-48" />
        )}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Add</button>
      </form>
      {modalMessage && <Modal message={modalMessage} onClose={handleCloseModal} />}
      {showConfirmModal && (
        <ConfirmModal
          message="Apakah Anda yakin ingin mengirim data ini?"
          onConfirm={handleConfirmSubmit}
          onCancel={handleCancelConfirm}
        />
      )}
    </div>
  );
}

export default Home1;
