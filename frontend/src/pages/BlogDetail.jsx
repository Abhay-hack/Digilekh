import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiInstance } from '../axios';
import CommentSection from '../components/CommentSection';
import Header from "../components/Header";

const BlogDetail = () => {
  const { id } = useParams();  // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await apiInstance.get(`/blog/${id}`);  // Fetch the full blog using the ID
        setBlog(response.data.blog);  
        setLoading(false);
      } catch (error) {
        setError("Error fetching blog details. Please try again later.");
        setLoading(false);
        console.error("Error fetching blog detail:", error.response ? error.response.data : error.message);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return <div>Loading blog...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="blog-detail p-4">
      <Header/>
      <h2 className="text-3xl font-semibold mb-4">{blog.title}</h2>
      <img 
        src={`http://localhost:5000${blog.image || "/uploads/default-image.jpg"}`} 
        alt={blog.title}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-600">{blog.content}</p>
      <p className="text-gray-500 text-sm mt-4">
        Posted by {blog.author ? blog.author.fullname : "Anonymous"} {/* Display the author's name */}
      </p>

      {/* Comment Section Component */}
      <CommentSection blogId={id} /> {/* Pass the blogId to the CommentSection component */}
    </div>
  );
};

export default BlogDetail;
