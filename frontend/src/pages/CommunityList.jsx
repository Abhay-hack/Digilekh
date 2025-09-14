import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { communityInstance } from '../axios';
import Header from "../components/Header";
import Card from "../components/Card";
import Loader from '../components/Loader';

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get token from localStorage
        if (token) {
          communityInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        const response = await communityInstance.get('/community');
        setCommunities(response.data.communities);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching communities:', err);
        setError(err.response?.data?.error || 'Unable to load communities. Please try again later.');
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchCommunities();
    }, 1000); 
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 bg-red-100 p-4 rounded-md">{error}</div>;
  if (communities.length === 0) {
    return (
      <div className="text-center mt-10">
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
    <div className="community-list bg-[#86DEB7] min-h-screen px-6 lg:px-12">
      <Header />
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Available Communities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {communities.map((community) => (
            <Card
              key={community._id}
              title={community.name}
              description={community.description}
              onJoin={() => navigate(`/community/${community._id}`)}
              onView={() => navigate(`/community/${community._id}`)}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/community/create')}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create a Community
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityList;
