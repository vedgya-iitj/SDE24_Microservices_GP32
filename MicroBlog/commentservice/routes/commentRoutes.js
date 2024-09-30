const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

/**
 * Handles the Post request for new comments
 *
 * @param {*} req - Header passed by View.
 * @returns {res} - resp status code.
 */
router.post('/', async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(201).send(savedComment);
    } catch (error) {
        res.status(500).send(error);
    }
});



router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * Checks if the given value is a non-null object.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is a non-null object, otherwise false.
 */
module.exports = router;
