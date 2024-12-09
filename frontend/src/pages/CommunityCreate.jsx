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
    setLoading(true); // Show loading state
    setError(null); // Reset previous errors

    try {
      await communityInstance.post(
        '/create',
        { name, description }
      );
      console.log("test");
      setSuccessMessage('Community created successfully!');
      setTimeout(() => {
        navigate('/community'); // Redirect to community list after 2 seconds
      }, 2000);
    } catch (err) {
      console.error('Error creating community:', err);
      setError('Failed to create community. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="community-create">
      <h2 className="text-2xl font-bold">Create Community</h2>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Success message */}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            className="border px-4 py-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3} // Add length validation (optional)
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            className="border px-4 py-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10} // Optional length validation for description
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Creating...' : 'Create'} {/* Show loading text */}
        </button>
      </form>
    </div>
  );
};

export default CommunityCreate;
