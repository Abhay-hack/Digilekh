import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiInstance, userInstance, communityInstance } from '../axios';
import Header from '../components/Header';
import Loader from '../components/Loader';

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

        setUserData(response.data.user);
        setBlogs(response.data.blogs || []);
        setCommunities(response.data.communities || []);
      } catch (error) {
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
      await communityInstance.delete(`/${communityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCommunities((prevCommunities) =>
        prevCommunities.filter((community) => community._id !== communityId)
      );
      alert('Community deleted successfully');
    } catch (error) {
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
      console.error('Error during logout:', error.message);
    }
  };

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="profile-page min-h-screen bg-gray-50 py-0 px-8"> {/* Removed extra padding */}
      <Header />
      <div className="container max-w-4xl mx-auto mt-8"> {/* Added margin top here */}
        <div className="profile-header mb-12 flex flex-col items-center bg-white shadow-lg p-8 rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Hello, {userData?.fullname || 'User'}</h2>
          <p className="text-lg text-gray-600 mb-4">Email: {userData?.email}</p>
        </div>

        {/* Blogs Section */}
        <div className="user-blogs mt-8">
          <h3 className="text-2xl font-semibold mb-6">Your Blogs:</h3>
          {blogs.length > 0 ? (
            <ul className="space-y-6">
              {blogs.map((blog) => (
                <li key={blog._id} className="bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition duration-200">
                  <h4 className="text-xl font-semibold text-gray-800">{blog.title}</h4>
                  <p className="text-gray-600 mt-2">{blog.content.slice(0, 100)}...</p>
                  <a href={`/api/blog/${blog._id}`} className="text-blue-500 hover:text-blue-700 mt-2 inline-block">Read more</a><br />
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="mt-4 text-red-500 hover:text-red-700 focus:outline-none"
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

        {/* Communities Section */}
        <div className="user-communities mt-12">
          <h3 className="text-2xl font-semibold mb-6">Your Communities:</h3>
          {communities.length > 0 ? (
            <ul className="space-y-6">
              {communities.map((community) => (
                <li key={community._id} className="bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition duration-200">
                  <h4 className="text-xl font-semibold text-gray-800">{community.name}</h4>
                  <p className="text-gray-600 mt-2">{community.description}</p>
                  <p className="text-gray-500 text-sm">Created by: {community.creator.fullname}</p>
                  <a href={`/community/${community._id}`} className="text-blue-500 hover:text-blue-700 mt-2 inline-block">Read more</a><br />
                  <button
                    onClick={() => handleDeleteCommunity(community._id)}
                    className="mt-4 text-red-500 hover:text-red-700 focus:outline-none"
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

        {/* Logout Section */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
