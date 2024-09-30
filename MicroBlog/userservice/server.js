const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI_USERS, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("User MongoDB connected"))
    .catch(err => console.log(err));

// Import Routes
/**
 * The `userRoutes` module.
 *
 * This module handles routing for user-related operations, such as user
 * registration, authentication, profile management, and other user-specific
 * functionalities. It exports the user routing configurations that are
 * implemented in `./routes/userRoutes`.
 *
 * Typical routes managed by this module might include:
 * - User registration
 * - User login and authentication
 * - Password reset and recovery
 * - User account details and profile management
 *
 * This module connects these routes to the appropriate controllers and
 * middleware functions that handle the various user-related requests and
 * responses.
 */
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('User Service API');
});

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});
