import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "../axios";
import Header from "./Header";
import EmojiPicker from "emoji-picker-react";
import Loader from "./Loader";

const BlogPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageData, setImageData] = useState(""); // store Base64
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiTarget, setEmojiTarget] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    if (emojiTarget === "title") setTitle((prev) => prev + emojiObject.emoji);
    else if (emojiTarget === "content") setContent((prev) => prev + emojiObject.emoji);
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("You must be logged in to post a blog.");
          setLoading(false);
          return;
        }
      
        // Send Base64 string directly
        const payload = {
          title,
          content,
          image: imageData || null, // this must be Base64
        };
      
        await apiInstance.post("/blog/create", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      
        navigate("/api/blog");
      } catch (error) {
        setError("Failed to post the blog. Please try again later.");
        console.error("Error posting blog:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };


  if (loading) return <Loader />;

  return (
    <div className="bg-[#86DEB7] min-h-screen relative px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="mt-8 max-w-3xl mx-auto bg-[#D6D3F0] shadow-md rounded-lg p-6 sm:p-8 relative">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center sm:text-left">
          Create a New Blog
        </h2>

        {error && (
          <div className="text-red-500 mb-4 p-2 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="relative">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <div className="flex items-center relative">
              <input
                type="text"
                id="title"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:text-base"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => {
                  setEmojiTarget("title");
                  setShowEmojiPicker((prev) => !prev);
                }}
                className="ml-2 text-2xl"
              >
                😊
              </button>

              {showEmojiPicker && emojiTarget === "title" && (
                <div className="absolute left-0 top-full mt-2 z-10 bg-white border shadow-lg rounded-md p-2 w-64 sm:w-80 max-h-72 overflow-y-auto">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="relative">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Blog Content
            </label>
            <div className="flex items-start relative">
              <textarea
                id="content"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none w-full sm:text-base"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => {
                  setEmojiTarget("content");
                  setShowEmojiPicker((prev) => !prev);
                }}
                className="ml-2 text-2xl mt-1"
              >
                😊
              </button>

              {showEmojiPicker && emojiTarget === "content" && (
                <div className="absolute left-0 top-full mt-2 z-10 bg-white border shadow-lg rounded-md p-2 w-64 sm:w-80 max-h-72 overflow-y-auto">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Cover Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="mt-1 w-full text-sm text-gray-500"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogPost;
