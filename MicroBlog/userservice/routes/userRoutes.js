const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/register', async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Password comparison logic (simple plain text for demo)
        if (user.password === password) {
            res.status(200).send({ message: 'Login successful', user });
        } else {
            res.status(401).send('Incorrect password');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * Module exports
 * @module module.exports
 */
module.exports = router;
