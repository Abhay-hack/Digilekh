import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { communityInstance } from '../axios';
import Header from "../components/Header";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await communityInstance.get('/');
        setCommunities(response.data.communities);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching communities:', err);
        setError('Unable to load communities. Please try again later.');
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="text-red-500 bg-red-100 p-4 rounded-md">{error}</div>;
  if (communities.length === 0) {
    return (
      <div className="text-center">
        <p>No communities available. Why not create one?</p>
        <button
          onClick={() => navigate('/community/create')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
        >
          Create a Community
        </button>
      </div>
    );
  }

  return (
    <div className="community-list">
      <Header />
      <h2 className="text-2xl font-bold mb-4">Communities</h2>

      <ul>
        {communities.map((community) => (
          <li key={community._id} className="mb-4">
            <h3
              className="text-lg font-semibold cursor-pointer hover:text-blue-500"
              onClick={() => navigate(`/community/${community._id}`)}
            >
              {community.name}
            </h3>
            <p className="text-gray-600">{community.description}</p>
          </li>
        ))}
      </ul>

      <div className="mb-6">
        <button
          onClick={() => navigate('/community/create')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create a Community
        </button>
      </div>
    </div>
  );
};

export default CommunityList;
