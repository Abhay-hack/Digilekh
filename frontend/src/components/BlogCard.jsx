import React from "react";
import { Link } from "react-router-dom";
import { CardContainer, CardBody } from "../components/ui/3d-card";

const BlogCard = ({ blog }) => {
  const imageUrl = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `http://localhost:5000${blog.image}`
    : `http://localhost:5000/uploads/default-image.jpg`;

  const authorName = blog.author ? blog.author.fullname || blog.author.username : "Anonymous";

  return (
    <CardContainer containerClassName="group rounded-lg">
      <CardBody className="rounded-lg shadow-md bg-white w-80 h-[340px] flex flex-col transition transform hover:-translate-y-2 hover:shadow-lg duration-300">
        {/* Image Section */}
        <div className="h-[55%] overflow-hidden rounded-t-lg">
          <img
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={imageUrl}
            alt={blog.title || "Blog image"}
          />
        </div>

        {/* Content Section */}
        <div className="h-[45%] bg-gray-50 p-4 flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {blog.title || "Untitled Blog"}
          </h3>
          <div className="mt-3 text-sm text-gray-600">
            <p className="mb-2">By {authorName}</p>
            <Link
              to={`/api/blog/${blog._id}`}
              className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
            >
              Read More →
            </Link>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default BlogCard;
