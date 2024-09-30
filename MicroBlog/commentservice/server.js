const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI_COMMENTS, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Comment MongoDB connected"))
    .catch(err => console.log(err));

// Import Routes
const commentRoutes = require('./routes/commentRoutes');
app.use('/api/comments', commentRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Comment Service API');
});

app.listen(PORT, () => {
    console.log(`Comment Service running on port ${PORT}`);
});
