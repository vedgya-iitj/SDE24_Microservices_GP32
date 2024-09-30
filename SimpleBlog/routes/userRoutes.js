const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register User
router.post('/register', async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Password comparison logic (ensure you are using bcrypt for hashed passwords)
        if (user.password === password) { // Replace this with bcrypt.compare
            res.status(200).send({ message: 'Login successful', user });
        } else {
            res.status(401).send('Incorrect password');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
