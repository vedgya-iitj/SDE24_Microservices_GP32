const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/register', async (req, res) => {
    // const newUser = new User(req.body);
    const { username, password, email } = req.body;
    try {
        const userData = { username, password: password, email };
        console.log(userData);
        // const savedUser = await newUser.create();
        const newUserId = await User.create(userData);
        console.log(newUserId);
        res.status(201).send({ message: 'User registered successfully', userId: newUserId });
    }  catch (error) {
        if (error.code === 'ER_DUP_ENTRY') { // MySQL error for duplicate entry
            res.status(409).send({ error: 'Username or email already exists' });
        } else {
            res.status(500).send({ error: 'Registration failed. Try again.' });
        }
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log(password);
        console.log(username);

        const user = await User.findByUsername({ username });
        console.log('Users:', user);
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
