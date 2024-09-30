const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: { type: String, required: true },  // Link to post
    userId: { type: String, required: true },  // Use userId for reference
    commentText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
