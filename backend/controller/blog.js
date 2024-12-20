const Blog = require('../models/blog');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');  // Store files in 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  // Add timestamp to file name
    }
  });


  async function handleBlogPost(req, res) {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, 'Abhay');
        const userId = decoded.userId;

        const { title, content, published } = req.body;
        console.log(req.body);

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        // If file is uploaded, handle it
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;  // Save image URL (path)
        }

        const blog = await Blog.create({
            title,
            content,
            author: userId,
            published: published !== undefined ? published : true,
            image: imageUrl,
        });

        return res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleFetchComments(req, res) {
    try {
        const { blogId } = req.params;

        // Fetch the blog and populate comments with author details
        const blog = await Blog.findById(blogId)
            .populate({
                path: 'comments',
                populate: {
                    path: 'author', // Populate the author field
                    select: 'fullname' // Only select the 'fullname' field from the User model
                }
            });

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json({ comments: blog.comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Error fetching comments. Please try again later.' });
    }
}


async function handleCommentPost(req, res) {
    try {
        // Get the token from cookies
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: 'Authentication token is missing.' });
        }

        // Decode the token to get the userId
        const decoded = jwt.verify(token, "Abhay"); // Use environment variable for security
        const userId = decoded.userId;

        // Extract content and blogId from request
        const { blogId } = req.params;
        const { content } = req.body;

        // Validate content
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Comment content cannot be empty.' });
        }

        // Find the blog post by ID
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found.' });
        }

        // Create a new comment object
        const comment = new Comment({
            content: content.trim(),
            author: userId, // Reference the user who made the comment
            blogPost: blogId,
        });

        // Save the comment to the database
        await comment.save();

        // Add the comment to the blog's comments array
        blog.comments.push(comment._id);
        await blog.save();

        // Populate the author's full name for the response
        await comment.populate('author', 'fullname');

        // Return the comment data in the response
        return res.status(201).json({
            message: 'Comment posted successfully.',
            comment: {
                ...comment.toObject(),
                author: comment.author.fullname,
                createdAt: comment.createdAt,
            },
        });
    } catch (error) {
        console.error('Error in handleCommentPost:', error);
        return res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
    }
}

async function handleBlog(req,res){    
    try {
    const blogs = await Blog.find().populate('author', 'fullname');
    return res.status(200).json({ blogs });
} catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
}
}

async function handleDeleteComment(req, res) {
    try {
        const { commentId } = req.params;

        // Validate input
        if (!commentId) {
            return res.status(400).json({ error: 'Comment ID is required' });
        }

        // Fetch the comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Fetch the associated blog
        const blog = await Blog.findById(comment.blogPost);

        if (blog) {
            blog.comments = blog.comments.filter(id => id.toString() !== commentId);

            console.log('Blog comments before update:', blog.comments);
            console.log('Blog comments after update:', blog.comments);

            await blog.save(); // Save the updated blog
        }

        // Delete the comment
        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleDeleteBlog(req, res) {
    try {
        const { blogId } = req.params;
        if (!blogId) {
            return res.status(400).json({ error: 'Blog ID is required' });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        await Comment.deleteMany({ blog: blogId });

        await Blog.findByIdAndDelete(blogId);

        return res.status(200).json({ message: 'Blog and associated comments deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleIndividualBlog(req,res){
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).populate('author', 'fullname');

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        return res.status(200).json({ blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleUpdateBlog(req, res) {
    try {
        const { blogId } = req.params;
        const { title, content } = req.body;

        // Debugging logs
        console.log('Request Params:', req.params); // Check if blogId is correct
        console.log('Request Body:', req.body); // Check if title and content are correct

        if (!blogId || !title || !content) {
            return res.status(400).json({ message: "Invalid input data." });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { title, content },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        res.status(200).json({ message: "Blog updated successfully.", blog: updatedBlog });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Error updating the blog.", error: error.message });
    }
}


async function handleUpdateComment(req, res) {
    try {
        const { blogId, commentId } = req.params;  // Get both blogId and commentId from the URL
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Text is required to update the comment." });
        }

        // Find the comment by its ID
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        // Check if the user is authorized to edit the comment
        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to edit this comment." });
        }

        // Update the comment's text
        comment.text = text;
        const updatedComment = await comment.save();

        // Optionally, you could populate the comment with the author's details (e.g., fullname)
        await updatedComment.populate('author', 'fullname').execPopulate();

        // Return the updated comment
        res.status(200).json({ message: "Comment updated successfully.", comment: updatedComment });
    } catch (error) {
        res.status(500).json({ message: "Error updating the comment.", error: error.message });
    }
}


async function handleLikeBlog(req, res) {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const { blogId } = req.params;

        // Find the blog
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if the user already liked the blog
        const alreadyLiked = blog.likes.includes(userId);

        if (alreadyLiked) {
            // User is unliking the blog
            blog.likes = blog.likes.filter(id => id.toString() !== userId.toString());
        } else {
            // User is liking the blog
            blog.likes.push(userId);
        }

        // Save the updated blog
        await blog.save();

        return res.status(200).json({ message: alreadyLiked ? 'Blog unliked' : 'Blog liked', likes: blog.likes.length });
    } catch (error) {
        console.error('Error liking blog:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}



module.exports = {
    handleBlogPost,
    handleCommentPost,
    handleBlog,
    handleDeleteComment,
    handleDeleteBlog,
    handleIndividualBlog,
    handleUpdateBlog,
    handleUpdateComment,
    handleFetchComments,
    handleLikeBlog,
}