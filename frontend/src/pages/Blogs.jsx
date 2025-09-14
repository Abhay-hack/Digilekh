import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiInstance } from "../axios";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import Loader from "../components/Loader";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiInstance.get("/blog");
        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        setError("Error fetching blogs. Please try again later.");
        setLoading(false);
        console.error(
          "Error fetching blogs:",
          error.response ? error.response.data : error.message
        );
      }
    };

    setTimeout(() => {
      fetchBlogs();
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-br from-[#E0F7FA] to-[#E8F5E9] min-h-screen">
      <Header />

      <div className="blogs-page max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold text-[#1A237E] text-center mb-10">
          Explore Blogs
        </h2>

        {blogs.length === 0 ? (
          <div className="text-center text-[#37474F]">
            <p className="text-lg mb-4">
              There are no blogs available right now.
            </p>
            <p className="text-md mb-6">
              We're working on adding fresh content. Stay tuned!
            </p>
            <Link
              to="/create-blog"
              className="bg-[#0288D1] text-white px-6 py-3 rounded-full hover:bg-[#01579B] transition duration-200"
            >
              Create Your Blog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link to={`/api/blog/${blog._id}`} key={blog._id}>
                <BlogCard blog={blog} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
