const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a new Post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).send(savedPost);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
