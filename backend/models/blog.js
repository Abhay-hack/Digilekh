const { mongoose } = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    image: {
        type: String
    },
    published: {
        type: Boolean,
        default: false
    },
    likeCount: {
        type: Number,
        default: 0 // Initializes like count at zero
    },
    createdAt: { 
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
