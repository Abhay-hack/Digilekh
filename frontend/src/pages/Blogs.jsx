import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiInstance } from '../axios';
import BlogCard from "../components/BlogCard";  // Import BlogCard
import Header from "../components/Header";
import Loader from "../components/Loader";  // Import the Loader component

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiInstance.get("/blog");
        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        setError("Error fetching blogs. Please try again later.");
        setLoading(false);
        console.error("Error fetching blogs:", error.response ? error.response.data : error.message);
      }
    };

    // Set a minimum loading time to show loader for at least 2 seconds
    setTimeout(() => {
      fetchBlogs();
    }, 1000); 
  }, []); 

  if (loading) {
    return <Loader />;  // Use Loader component while loading
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      <Header />

      <div className="blogs-page max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-semibold text-gray-900 text-center mb-10">Available Blogs</h2>

        {blogs.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-lg mb-4">There are no blogs available right now.</p>
            <p className="text-md mb-6">We're working on adding fresh content. Stay tuned!</p>
            <Link to="/create-blog" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-200">
              Create Your Blog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <Link to={`/api/blog/${blog._id}`} key={blog._id}>
                <BlogCard blog={blog} />  {/* Using the BlogCard component */}
              </Link>
            ))} 
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
