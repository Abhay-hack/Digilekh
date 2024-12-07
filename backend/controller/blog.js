const Blog = require('../models/blog');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');

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

        if (!title || !content || !published) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const blog = await Blog.create({
            title,
            content,
            author:userId,
            published,
        });

        return res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleCommentPost(req, res) {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, 'Abhay');
        const userId = decoded.userId;

        const { content ,blogId} = req.body;
        console.log(req.body);

        if (!content || !blogId) {
            return res.status(400).json({ error: 'Content is required' });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        const comment = await Comment.create({
            content,
            author: userId,
            blogPost: blogId,
        });

        const commentId = comment._id;
        console.log("Comment Id:" + commentId);

        blog.comments.push(commentId);
        await blog.save();
        
        return res.status(201).json({ message: 'Comment Posted successfully', comment });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleBlog(req,res){    
    try {
    const blogs = await Blog.find();
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
        const blog = await Blog.findById(id).populate('author', 'name email');

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
        const { id } = req.params; 
        const { text } = req.body;

        if (!id || !text) {
            return res.status(400).json({ message: "Invalid input data." });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { text },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        res.status(200).json({ message: "Comment updated successfully.", comment: updatedComment });
    } catch (error) {
        res.status(500).json({ message: "Error updating the comment.", error: error.message });
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
}