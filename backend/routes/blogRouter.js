const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const authenticate = require("../middleware/auth");

const {
    handleBlogPost,
    handleCommentPost,
    handleBlog,
    handleDeleteComment,
    handleDeleteBlog,
    handleIndividualBlog,
    handleUpdateBlog,
    handleUpdateComment,
} = require('../controller/blog');

router.get('/blog', authenticate,handleBlog);

router.get('/blog/:id', authenticate, handleIndividualBlog);


router.post('/blog', authenticate,handleBlogPost);

router.patch('/blog/:blogId', handleUpdateBlog);

router.delete('/blog/:blogId', handleDeleteBlog);

router.post('/blog/comment', authenticate,handleCommentPost);

router.post('/blog/comment/:commentId', handleUpdateComment);

router.delete('/blog/comment/:commentId', handleDeleteComment);



module.exports = router;