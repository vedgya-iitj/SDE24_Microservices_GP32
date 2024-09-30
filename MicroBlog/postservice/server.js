const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(bodyParser.json());

/**
Connect to mongo DB, URI passed in the env file or docker compose.
 */
mongoose.connect(process.env.MONGODB_URI_POSTS, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Post MongoDB connected"))
    .catch(err => console.log(err));


/**
 * The postRoutes variable imports the routes for handling post-related operations
 * from the './routes/postRoutes' file. This module typically handles the creation,
 * retrieval, updating, and deletion of posts.
 *
 * @module postRoutes
 */
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Post Service API');
});

app.listen(PORT, () => {
    console.log(`Post Service running on port ${PORT}`);
});
