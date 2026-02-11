import React, { useState } from 'react';

const ProfileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePdf', file);

    try {
      // Assuming you store the token in localStorage
      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

      const response = await fetch('http://localhost:5000/api/users/profile/upload-pdf', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Include your auth token
        },
        body: formData, // FormData handles the Content-Type automatically
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profile updated successfully found in PDF!');
        console.log('Updated User:', data);
      } else {
        setMessage('Failed to update profile: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Auto-fill Profile from PDF</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload ApplyBoard/Profile PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload & Extract
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default ProfileUpload;