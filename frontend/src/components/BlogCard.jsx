import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  // Construct the image URL
  const imageUrl = blog.image 
    ? `http://localhost:5000${blog.image}`  // Image path from backend
    : `http://localhost:5000/uploads/default-image.jpg`;  // Fallback image

  // Check if the author is populated
  const authorName = blog.author ? blog.author.fullname || blog.author.username : "Anonymous";

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden" key={blog._id}>
      <img
        className="w-full h-48 object-cover"
        src={imageUrl}  // Display the image using the correct URL
        alt={blog.title || "Blog image"}  // Alt text for the image
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {blog.title || "Untitled Blog"}  {/* Fallback for blog title */}
        </h3>
        <p className="text-gray-600 text-sm mt-2">
          Posted by {blog.author.fullname || "Anonymous"}  {/* Display the author's name or username */}
        </p>
        <Link to={`/api/blog/${blog._id}`} className="text-blue-500 hover:underline mt-2 block">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
