const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const authenticate = require("../middleware/auth");
const upload = require('../middleware/multer')

const {
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
} = require('../controller/blog');

router.get('/blog', authenticate,handleBlog);

router.get('/blog/:id', authenticate, handleIndividualBlog);


router.post('/blog/create', upload.single('image'), authenticate,handleBlogPost);

router.patch('/blog/:blogId', handleUpdateBlog);

router.delete('/blog/:blogId', handleDeleteBlog);

router.get('/blog/:blogId/comment', authenticate, handleFetchComments);

router.post('/blog/:blogId/comment', authenticate,handleCommentPost);   

router.patch('/blog/:blogId/comment/:commentId', handleUpdateComment);

router.delete('/blog/comment/:commentId', handleDeleteComment);

router.post('/blog/:blogId/like', handleLikeBlog);


module.exports = router;