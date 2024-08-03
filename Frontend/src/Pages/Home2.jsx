import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

Modal.setAppElement("#root");

function Home2() {
  const [osis, setOsis] = useState([]);
  const [editingOsis, setEditingOsis] = useState(null);
  const [error, setError] = useState(null);
  const [deleteOsis, setDeleteOsis] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchOsis();
  }, []);

  const fetchOsis = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/osis");
      setOsis(response.data);
      setError(null);
    } catch (error) {
      console.error("There was an error fetching the OSIS data:", error);
      setError("There was an error fetching the data. Please try again later.");
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", editingOsis.name);
    formData.append("role", editingOsis.role);
    formData.append("age", editingOsis.age);
    if (editingOsis.image) {
      formData.append("image", editingOsis.image);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/osis/${editingOsis._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      const updatedOsis = osis.map((o) => (o._id === editingOsis._id ? response.data : o));
      setOsis(updatedOsis);
      setEditingOsis(null);
      setShowEditModal(false);
      toast.success("OSIS member updated successfully!");
    } catch (error) {
      console.error("There was an error updating the OSIS data:", error);
      toast.error("Failed to update OSIS member!");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/osis/${deleteOsis._id}`);
      setOsis(osis.filter((o) => o._id !== deleteOsis._id));
      setDeleteOsis(null);
      setShowDeleteModal(false);
      toast.success("OSIS member deleted successfully!");
    } catch (error) {
      console.error("There was an error deleting the OSIS data:", error);
      toast.error("Failed to delete OSIS member!");
    }
  };

  const handleCancelEdit = () => {
    setEditingOsis(null);
    setShowEditModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditingOsis({ ...editingOsis, image: file });

    // Image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Data Pengurus OSIS</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 max-w-lg mx-auto" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {osis.map((o) => (
          <div key={o._id} className="bg-white p-6 rounded-lg shadow-md">
            {editingOsis && editingOsis._id === o._id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editingOsis.name}
                  onChange={(e) => setEditingOsis({ ...editingOsis, name: e.target.value })}
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="role"
                  value={editingOsis.role}
                  onChange={(e) => setEditingOsis({ ...editingOsis, role: e.target.value })}
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name="age"
                  value={editingOsis.age}
                  onChange={(e) => setEditingOsis({ ...editingOsis, age: e.target.value })}
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="w-full mb-2"
                />
                {imagePreview && <img src={imagePreview} alt="Preview" className="w-full mb-2 rounded" />}
                <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mb-2">
                  <PencilIcon className="h-5 w-5 mr-2" /> Update
                </button>
                <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded flex items-center">
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <img src={o.imageUrl} alt={o.name} className="w-full h-32 object-cover rounded mb-2" />
                <h2 className="text-xl font-bold mb-2">{o.name}</h2>
                <p className="text-gray-700 mb-1">Role: {o.role}</p>
                <p className="text-gray-700">Age: {o.age}</p>
                <div className="flex justify-end mt-4">
                  <button onClick={() => { setEditingOsis(o); setShowEditModal(true); }} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mr-2">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => { setDeleteOsis(o); setShowDeleteModal(true); }} className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        className="bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-20"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this OSIS member?</p>
        <div className="flex justify-end mt-4">
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
          <button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </Modal>

      <Modal
        isOpen={showEditModal}
        onRequestClose={handleCancelEdit}
        className="bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-20"
      >
        <h2 className="text-xl font-bold mb-4">Edit OSIS Member</h2>
        {editingOsis && (
          <div>
            <input
              type="text"
              name="name"
              value={editingOsis.name}
              onChange={(e) => setEditingOsis({ ...editingOsis, name: e.target.value })}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="role"
              value={editingOsis.role}
              onChange={(e) => setEditingOsis({ ...editingOsis, role: e.target.value })}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="age"
              value={editingOsis.age}
              onChange={(e) => setEditingOsis({ ...editingOsis, age: e.target.value })}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full mb-2"
            />
            {imagePreview && <img src={imagePreview} alt="Preview" className="w-full mb-2 rounded" />}
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mb-2">
              <PencilIcon className="h-5 w-5 mr-2" /> Update
            </button>
            <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded flex items-center">
              Cancel
            </button>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Home2;
