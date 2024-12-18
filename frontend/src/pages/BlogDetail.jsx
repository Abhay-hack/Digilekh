import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiInstance } from "../axios";
import CommentSection from "../components/CommentSection";
import Header from "../components/Header";
import profilePlaceholder from "../assets/user.png";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await apiInstance.get(`/blog/${id}`);
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
    return <div className="flex justify-center items-center h-screen text-gray-500">Loading blog...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 bg-[#F5ECCD] lg:px-8 py-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 mb-6">{blog.title}</h1>
          <div className="flex items-center text-sm text-gray-600 mb-6">
          <img
            src={profilePlaceholder}
            alt={blog.author?.fullname || "Author"}
            className="w-8 h-8 rounded-full mr-3"
          />

            <span>
              {blog.author ? blog.author.fullname : "Anonymous"} -{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
          <img
            src={`http://localhost:5000${blog.image || "/uploads/default-image.jpg"}`}
            alt={blog.title}
            className="w-full h-auto object-cover rounded-md shadow-lg mb-6"
          />
          <div className="prose lg:prose-xl text-gray-800 leading-relaxed">
            {blog.content}
          </div>
        </article>
        <hr className="my-8" />
        <CommentSection blogId={id} />
      </div>
    </div>
  );
};

export default BlogDetail;
