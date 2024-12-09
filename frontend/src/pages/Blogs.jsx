import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiInstance } from '../axios';
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";  // Import the Header Component

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(""); // Added error state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiInstance.get("/blog");  // API endpoint adjusted
        setBlogs(response.data.blogs);  // Assuming response contains an array of blogs
        setLoading(false);  // Set loading to false when data is fetched
      } catch (error) {
        setError("Error fetching blogs. Please try again later.");
        setLoading(false);  // Set loading to false even if there was an error
        console.error("Error fetching blogs:", error.response ? error.response.data : error.message);
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array means this runs only once on component mount

  if (loading) {
    return <div className="text-center py-4">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      {/* Include the Header component */}
      <Header />

      <div className="blogs-page p-4">
        <h2 className="text-2xl font-semibold mb-4">Blogs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.length === 0 ? (
            <div className="text-center col-span-full">No blogs available</div>
          ) : (
            blogs.map((blog) => (
              <Link to={`/api/blog/${blog._id}`} key={blog.id}>
                <BlogCard blog={blog} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
