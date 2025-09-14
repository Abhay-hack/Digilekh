import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiInstance } from "../axios";
import CommentSection from "../components/CommentSection";
import Header from "../components/Header";
import profilePlaceholder from "../assets/user.png";
import LikeButton from "../components/LikeButton";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await apiInstance.get(`/blog/${id}`);
        setBlog(response.data.blog);
        setLiked(response.data.blog.likes.includes(response.data.userId));
        setLoading(false);
      } catch (error) {
        setError("Error fetching blog details. Please try again later.");
        setLoading(false);
        console.error(
          "Error fetching blog detail:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchBlogDetail();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await apiInstance.post(`/blog/${id}/like`);
      setLiked(!liked);
      setBlog((prevBlog) => ({
        ...prevBlog,
        likes: response.data.likes,
      }));
    } catch (error) {
      console.error("Error liking/unliking blog:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#0288D1] text-lg font-medium">
        Loading blog...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#E0F7FA] to-[#E8F5E9] min-h-screen">
      <Header />

      <div className="px-4 lg:px-16 py-12">
        <article className="w-full">
          {/* Title */}
          <h1 className="text-5xl font-extrabold leading-tight text-[#1A237E] mb-8">
            {blog.title}
          </h1>

          {/* Author */}
          <div className="flex items-center text-sm text-[#37474F] mb-10">
            <img
              src={profilePlaceholder}
              alt={blog.author?.fullname || "Author"}
              className="w-12 h-12 rounded-full mr-4 shadow"
            />
            <span className="font-medium text-base">
              {blog.author ? blog.author.fullname : "Anonymous"} •{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Blog Image */}
          <div className="w-auto h-auto mb-10 overflow-hidden ">
            <img
              src={
                blog.image?.startsWith("http")
                  ? blog.image
                  : `http://localhost:5000${
                      blog.image || "/uploads/default-image.jpg"
                    }`
              }
              alt={blog.title}
              className="w-auto h-auto object-cover"
            />
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none text-[#263238] leading-relaxed text-justify">
            {blog.content}
          </div>
        </article>

        {/* Like Button */}
        <div className="mt-8">
          <LikeButton liked={liked} handleLike={handleLike} blog={blog} />
        </div>

        <hr className="my-12 border-[#B0BEC5]" />

        {/* Comments */}
        <div>
          <CommentSection blogId={id} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
