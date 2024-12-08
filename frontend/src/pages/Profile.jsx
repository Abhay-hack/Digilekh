import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiInstance,userInstance } from '../axios';
import Header from '../components/Header';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]); // To store blogs posted by the user
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login'); // Redirect to login page if no token is found
        return;
      }

      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state
        const response = await userInstance.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data.user); // Set user data from response
        setBlogs(response.data.blogs); // Set blogs posted by the user
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
        setError('Error fetching profile. Please try again later.');
        setLoading(false); // Stop loading
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleDeleteBlog = async (blogId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/'); // Redirect to login page if no token is found
      return;
    }

    try {
      // Send delete request to backend
      await apiInstance.delete(`/blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted blog from the state to update UI
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      alert('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error.response ? error.response.data : error.message);
      alert('Error deleting blog. Please try again later.');
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/'); // Redirect to login if there's no token
        return;
      }

      // Send logout request
      await userInstance.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('authToken'); // Remove token from localStorage
      navigate('/'); // Redirect to login page
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
      <Header/>
      <h2 className="text-3xl font-bold mb-4">Welcome, {userData?.fullname || 'User'}</h2>
      <p className="text-xl mb-6">Email: {userData?.email}</p>

      {/* Blogs Posted by the User */}
      <div className="user-blogs mt-8">
        <h3 className="text-2xl font-semibold mb-4">Your Blogs:</h3>
        {blogs.length > 0 ? (
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li key={blog._id} className="bg-white p-4 shadow-md rounded-md">
                <h4 className="text-xl font-bold">{blog.title}</h4>
                <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
                <a href={`/api/blog/${blog._id}`} className="text-blue-500">Read more</a>

                {/* Delete Blog Button */}
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

      {/* Logout button */}
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
