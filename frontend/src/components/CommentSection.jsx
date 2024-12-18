import React, { useState, useEffect } from "react";
import { apiInstance } from "../axios";
import moment from "moment"; // Import Moment.js for formatting timestamps
import profilePlaceholder from "../assets/user.png"; // Replace with the path to your placeholder image

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing comments when the component is mounted
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiInstance.get(`/blog/${blogId}/comment`);
        setComments(response.data.comments); // Assuming your backend sends an array of comments
      } catch (err) {
        console.error("Error fetching comments:", err.response?.data || err.message);
        setError("Unable to fetch comments. Please try again.");
      }
    };

    fetchComments();
  }, [blogId]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return; // Prevent empty submissions

    try {
      setLoading(true);
      setError(null);
      const response = await apiInstance.post(`/blog/${blogId}/comment`, {
        content: newComment,
      });

      // Add the new comment to the list of comments
      setComments([...comments, response.data.comment]);
      setNewComment(""); // Clear the input field
      setLoading(false);
    } catch (err) {
      console.error("Error posting comment:", err.response?.data || err.message);
      setError("Unable to post comment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="comment-section mt-8 w-full max-w-2xl mx-auto">
      {/* Heading */}
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">
        Comments ({comments.length})
      </h2>

      {/* Comment input form */}
      <form
        onSubmit={handleCommentSubmit}
        className="flex items-center space-x-3 mb-6"
      >
        <img
          src={profilePlaceholder}
          alt="Your Profile"
          className="w-8 h-8 rounded-full"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 p-2 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black"
          rows={1}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Post"}
        </button>
      </form>

      {/* Error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* List of comments */}
      <div className="comments-list space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="comment flex space-x-3 p-4 bg-gray-50 rounded-md shadow-sm"
            >
              {/* Profile Picture */}
              <img
                src={comment.author?.profilePicture || profilePlaceholder}
                alt={comment.author?.fullname || "Anonymous"}
                className="w-8 h-8 rounded-full"
              />

              {/* Comment Content */}
              <div className="flex-1">
                {/* Comment Header */}
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">
                    {comment.author?.fullname || "Anonymous"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {moment(comment.createdAt).fromNow()}
                  </span>
                </div>
                {/* Comment Text */}
                <p className="text-gray-700 mt-1">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
