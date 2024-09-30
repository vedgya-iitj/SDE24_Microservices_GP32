const mongoose = require('mongoose');

/**
 * CommentSchema defines the schema for comments in a MongoDB collection using Mongoose.
 *
 * Properties:
 * - postId: Identifier for the associated post. This field is required.
 * - userId: Identifier for the user who made the comment. This field is required.
 * - commentText: The text content of the comment. This field is required.
 * - createdAt: The date and time when the comment was created, with a default value of the current date and time.
 */
const CommentSchema = new mongoose.Schema({
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    commentText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
