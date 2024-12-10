import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "../axios";
import Header from "../components/Header";
import EmojiPicker from "emoji-picker-react";

const BlogPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiTarget, setEmojiTarget] = useState(null); // Track which input is targeted
  const emojiPickerRef = useRef(null); // Ref for emoji picker container

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handleEmojiClick = (emojiObject) => {
    if (emojiTarget === "title") {
      setTitle((prev) => prev + emojiObject.emoji);
    } else if (emojiTarget === "content") {
      setContent((prev) => prev + emojiObject.emoji);
    }
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

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await apiInstance.post("/blog/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <Header />
      <div className="mt-8 max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Create a New Blog
        </h2>
        {error && (
          <div className="text-red-500 mb-4 p-2 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="relative">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Blog Title
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="title"
                className="w-full mt-1 px-4 py-2  border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Content Input */}
          <div className="relative">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Blog Content
            </label>
            <div className="flex items-start">
              <textarea
                id="content"
                className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <button
                type="button"
                className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none mt-1"
                onClick={() => {
                  setEmojiTarget("content");
                  setShowEmojiPicker((prev) => !prev);
                }}
              >
                😊
              </button>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Cover Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              onChange={handleImageChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Blog"}
            </button>
          </div>
        </form>
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bg-white shadow-lg rounded-md border p-2"
          style={{
            top: `${emojiTarget === "title" ? "100px" : "280px"}`, // Adjust top dynamically
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default BlogPost;
