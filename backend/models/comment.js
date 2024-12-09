const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blogPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
