import React, { useState, useEffect } from "react";
import { apiInstance } from '../axios';
import moment from 'moment'; // Import Moment.js for formatting timestamps

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
    <div className="comment-section mt-8">
      {/* Comment input form */}
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Comment"}
        </button>
      </form>

      {/* Error message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* List of comments */}
      <div className="comments-list mt-4">
        <h2>Comments Posted By Users</h2>
        {comments.map((comment) => (
        <div key={comment._id} className="comment p-2 border-b">
            <div className="flex justify-between items-center">
            {/* Display comment author's fullname */}
            <p className="font-semibold">{comment.author?.fullname || 'Anonymous'}</p>
            {/* Display comment's posted time */}
            <p className="text-gray-500 text-sm">{moment(comment.createdAt).fromNow()}</p>
            </div>
            {/* Display comment content */}
            <p>{comment.content}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
