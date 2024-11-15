const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'mysql_users', // Updated host name
    user: process.env.MYSQL_USER || 'microblog',
    password: process.env.MYSQL_PASSWORD || 'userservice',
    database: process.env.MYSQL_DATABASE || 'userservice',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const connectWithRetry = async () => {
    let retries = 5;
    while (retries) {
        try {
            const connection = await pool.getConnection();
            console.log("Successfully connected to MySQL database");
            connection.release();
            return;
        } catch (err) {
            console.error("Error connecting to MySQL database:", {
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                database: process.env.MYSQL_DATABASE,
                pass: process.env.MYSQL_PASSWORD,
                rootpass: process.env.MYSQL_ROOT_PASSWORD,
                error: err.message,
                retriesLeft: retries - 1
            });
            retries -= 1;
            // Wait for 5 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

connectWithRetry();

// Test database connection
pool.getConnection()
    .then(connection => {
        console.log("Successfully connected to MySQL database");
        connection.release();
    })
    .catch(err => {
        console.error("Error connecting to MySQL database:", err);
    });

// Import Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('User Service API');
});

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
    console.log(`DB:${process.env.MYSQL_HOST} User ${process.env.MYSQL_USER} database ${process.env.MYSQL_PASSWORD}`);
});