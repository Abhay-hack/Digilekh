import React, { useState, useEffect, useRef } from "react";
import { apiInstance } from "../axios";
import moment from "moment";
import profilePlaceholder from "../assets/user.png";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const commentsEndRef = useRef(null);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      setFetching(true);
      try {
        const res = await apiInstance.get(`/blog/${blogId}/comment`);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError("Unable to fetch comments. Please try again.");
      } finally {
        setFetching(false);
      }
    };
    fetchComments();
  }, [blogId]);

  // Scroll to last comment after update
  useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  // Handle comment submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const res = await apiInstance.post(`/blog/${blogId}/comment`, {
        content: newComment.trim(),
      });

      // Add new comment safely
      setComments((prev) => [...prev, res.data.comment]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("Unable to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section mt-8 w-full max-w-2xl mx-auto">
      {/* Heading */}
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">
        Comments ({comments.length})
      </h2>

      {/* Input Form */}
      <form
        onSubmit={handleCommentSubmit}
        className="flex items-start space-x-3 mb-6"
      >
        <img
          src={profilePlaceholder}
          alt="Your Profile"
          className="w-9 h-9 rounded-full border"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 p-2 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black"
          rows={2}
          disabled={loading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Comments */}
      <div className="comments-list space-y-4 max-h-80 overflow-y-auto pr-2">
        {fetching ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="comment flex space-x-3 p-3 bg-gray-50 rounded-md shadow-sm"
            >
              <img
                src={comment.author?.profilePicture || profilePlaceholder}
                alt={comment.author?.fullname || "Anonymous"}
                className="w-9 h-9 rounded-full border"
                onError={(e) => (e.target.src = profilePlaceholder)}
              />

              <div className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">
                    {comment.author?.fullname || "Anonymous"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {moment(comment.createdAt).fromNow()}
                  </span>
                </div>
                {/* Content */}
                <p className="text-gray-700 mt-1">{comment.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={commentsEndRef} />
      </div>
    </div>
  );
};

export default CommentSection;
