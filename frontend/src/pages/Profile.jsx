import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiInstance, userInstance } from '../axios';
import Header from '../components/Header';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await userInstance.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched profile data:', response.data); // Debugging log
        setUserData(response.data.user);
        setBlogs(response.data.blogs || []);
        setCommunities(response.data.communities || []);
      } catch (error) {
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
        setError('Error fetching profile. Please try again later.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleDeleteBlog = async (blogId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      await apiInstance.delete(`/blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      alert('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error.response ? error.response.data : error.message);
      alert('Error deleting blog. Please try again later.');
    }
  };

  const handleDeleteCommunity = async (communityId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      await apiInstance.delete(`/community/${communityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCommunities((prevCommunities) =>
        prevCommunities.filter((community) => community._id !== communityId)
      );
      alert('Community deleted successfully');
    } catch (error) {
      console.error('Error deleting community:', error.response ? error.response.data : error.message);
      alert('Error deleting community. Please try again later.');
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/');
        return;
      }

      await userInstance.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('authToken');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 py-4">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="profile-page min-h-screen bg-gray-100 py-10 px-5">
      <Header />
      <h2 className="text-3xl font-bold mb-4">Welcome, {userData?.fullname || 'User'}</h2>
      <p className="text-xl mb-6">Email: {userData?.email}</p>

      {/* Blogs Section */}
      <div className="user-blogs mt-8">
        <h3 className="text-2xl font-semibold mb-4">Your Blogs:</h3>
        {blogs.length > 0 ? (
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li key={blog._id} className="bg-white p-4 shadow-md rounded-md">
                <h4 className="text-xl font-bold">{blog.title}</h4>
                <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
                <a href={`/api/blog/${blog._id}`} className="text-blue-500">Read more</a>
                <button
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="mt-4 text-red-500 hover:text-red-700"
                >
                  Delete Blog
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You haven't posted any blogs yet.</p>
        )}
      </div>

      <div className="user-communities mt-8">
  <h3 className="text-2xl font-semibold mb-4">Your Communities:</h3>
  {communities.length > 0 ? (
    <ul className="space-y-4">
      {communities.map((community) => (
        <li key={community._id} className="bg-white p-4 shadow-md rounded-md">
          <h4 className="text-xl font-bold">{community.name}</h4>
          <p className="text-gray-600">{community.description}</p>
          <p className="text-gray-500">Created by: {community.creator.fullname}</p> {/* Display creator's full name */}
          <button
            onClick={() => handleDeleteCommunity(community._id)}
            className="mt-4 text-red-500 hover:text-red-700"
          >
            Delete Community
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">You haven't created any communities yet.</p>
  )}
</div>



      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
