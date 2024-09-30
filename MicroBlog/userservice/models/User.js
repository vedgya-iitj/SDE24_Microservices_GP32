const mongoose = require('mongoose');

/**
 * Represents the schema for a user in the database.
 *
 * @typedef {Object} UserSchema
 * @property {String} username - The unique username for the user.
 * @property {String} password - The password for the user's account.
 * @property {String} email - The unique email address for the user.
 */
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', UserSchema);
