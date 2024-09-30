const mongoose = require('mongoose');

/**
 * PostSchema represents the structure of a post document in a MongoDB collection.
 *
 * Fields:
 * - userId: A string representing the unique identifier of the user who created the post.
 * - content: A string containing the main content of the post.
 * - createdAt: A date indicating when the post was created, with a default value of the current date and time.
 */
const PostSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
