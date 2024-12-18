import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { communityInstance } from '../axios';

const CommunityCreate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await communityInstance.post('/create', { name, description });
      setSuccessMessage('Community created successfully!');
      setTimeout(() => {
        navigate('/community');
      }, 2000);
    } catch (err) {
      console.error('Error creating community:', err);
      setError('Failed to create community. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#86DEB7]">
      <div className="bg-[#D6D3F0] w-full max-w-md p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Create Community
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="border rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={3}
              placeholder="Enter community name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="border rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              minLength={10}
              rows="4"
              placeholder="Enter community description"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${
              loading ? 'bg-black-' : 'bg-black hover:bg-blue-600'
            } transition duration-200`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunityCreate;
