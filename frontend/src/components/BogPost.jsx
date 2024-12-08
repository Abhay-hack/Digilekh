import React, { useState } from "react";  
import { useNavigate } from "react-router-dom";
import { apiInstance } from '../axios';
import Header from "../components/Header";

const BlogPost = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null); // State to store the image file
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file change for the image
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImageFile(file); // Set the image file in state
    }
  };

  // Handle form submission
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

      // Create FormData to send data and file
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageFile) {
        formData.append("image", imageFile); // Append image file to form data
      }

      // POST request to create a new blog post (using the correct route '/blog/create')
      const response = await apiInstance.post(
        "/blog/create",  // Correct route for creating blogs
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Ensure the request is sent as form data
          },
        }
      );

      // Navigate to the list of blogs or a specific blog page after success
      navigate("/api/blog");  // Adjust based on where you want to redirect

    } catch (error) {
      setError("Failed to post the blog. Please try again later.");
      console.error("Error posting blog:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-post-form p-4">
      <Header />
      <h2 className="text-2xl font-semibold mb-4">Create a New Blog</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input 
            type="text" 
            id="title" 
            className="w-full px-4 py-2 border rounded-md" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">Content</label>
          <textarea
            id="content"
            className="w-full px-4 py-2 border rounded-md"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Upload Image(Optional)</label>
          <input
            type="file"
            id="image"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleImageChange} // Handle image selection
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogPost;
