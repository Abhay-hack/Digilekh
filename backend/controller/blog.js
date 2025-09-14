const Blog = require('../models/blog');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cloudinary = require('../cloudinaryConfig');


// const multer = require('multer');
// const path = require('path');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');  // Store files in 'uploads' folder
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname));  // Add timestamp to file name
//     }
//   });


// Create a new blog
async function handleBlogPost(req, res) {
    try {
        const token = req.cookies.authToken;
        if (!token) return res.status(401).json({ error: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const { title, content, published, image } = req.body;
        if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

        let imageUrl = null;

        if (image) {
            const result = await cloudinary.uploader.upload(image, {
                folder: "digilekh_blog_images",
                resource_type: "image",
            });
            imageUrl = result.secure_url;
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
        console.error('Error in handleBlogPost:', error);
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
        const { blogId } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: "Comment content is required" });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // Create comment
        const comment = new Comment({
            content,
            author: req.user.userId, // from JWT
            blogPost: blogId
        });

        await comment.save();

        // Push comment reference into blog
        blog.comments.push(comment._id);
        await blog.save();

        return res.status(201).json({
            message: "Comment added successfully",
            comment
        });
    } catch (err) {
        console.error("Comment Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Fetch all blogs
async function handleBlog(req, res) {
    try {
        const blogs = await Blog.find()
            .populate('author', 'fullname')
            .sort({ createdAt: -1 });

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

// Delete blog
async function handleDeleteBlog(req, res) {
    try {
        const { blogId } = req.params;
        if (!blogId) return res.status(400).json({ error: 'Blog ID is required' });

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        if (blog.image) {
            const publicId = blog.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`digilekh_blog_images/${publicId}`, { resource_type: "image" });
        }

        await Comment.deleteMany({ blogPost: blogId });
        await Blog.findByIdAndDelete(blogId);

        return res.status(200).json({ message: 'Blog and associated comments deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


// Fetch individual blog
async function handleIndividualBlog(req, res) {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).populate('author', 'fullname');

        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        return res.status(200).json({ blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


// Update existing blog
async function handleUpdateBlog(req, res) {
    try {
        const { blogId } = req.params;
        const { title, content, image } = req.body;

        if (!blogId || !title || !content) {
            return res.status(400).json({ message: "Invalid input data." });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ message: "Blog not found." });

        blog.title = title;
        blog.content = content;

        if (image) {
            // Optional: remove old image from Cloudinary
            if (blog.image) {
                const publicId = blog.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`digilekh_blog_images/${publicId}`, { resource_type: "image" });
            }

            const result = await cloudinary.uploader.upload(image, {
                folder: "digilekh_blog_images",
                resource_type: "image",
            });
            blog.image = result.secure_url;
        }

        const updatedBlog = await blog.save();
        return res.status(200).json({ message: "Blog updated successfully.", blog: updatedBlog });
    } catch (error) {
        console.error('Error in handleUpdateBlog:', error);
        return res.status(500).json({ message: "Error updating the blog.", error: error.message });
    }
}





async function handleUpdateComment(req, res) {
    try {
        const { commentId } = req.params;  // Only need commentId
        const { text } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({ message: "Text is required to update the comment." });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found." });

        // Ensure the user updating is the author
        if (comment.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to edit this comment." });
        }

        comment.content = text.trim();  // Update the content
        const updatedComment = await comment.save();

        await updatedComment.populate('author', 'fullname');

        return res.status(200).json({ message: "Comment updated successfully.", comment: updatedComment });
    } catch (error) {
        console.error('Error updating comment:', error);
        return res.status(500).json({ message: "Error updating the comment.", error: error.message });
    }
}



async function handleLikeBlog(req, res) {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        const userId = req.user.userId;
        const alreadyLiked = blog.likes.includes(userId);

        if (alreadyLiked) {
            // Remove like
            blog.likes = blog.likes.filter(id => id.toString() !== userId);
            blog.likeCount = Math.max(0, blog.likeCount - 1);
        } else {
            // Add like
            blog.likes.push(userId);
            blog.likeCount += 1;
        }

        await blog.save();

        return res.status(200).json({
            message: alreadyLiked ? "Like removed" : "Blog liked",
            likes: blog.likes,
            likeCount: blog.likeCount
        });
    } catch (err) {
        console.error("Like Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
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