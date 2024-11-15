const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'mysql_users', // Updated host name
    user: process.env.MYSQL_USER || 'microblog',
    password: process.env.MYSQL_PASSWORD || 'userservice',
    database: process.env.MYSQL_DATABASE || 'userservice',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to MySQL database');
        connection.release();
    } catch (err) {
        console.error('Error connecting to database:', {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            database: process.env.MYSQL_DATABASE,
            error: err.message
        });
    }
};

testConnection();

class User {
    static async findByUsername(username) {
        let connection;
        try {
            // Get a connection from the pool
            connection = await pool.getConnection();
            console.log('Connected to database');

            const[all] = await connection.query(`SELECT * FROM users`);

            console.log("All Users",all);
            // Test if the connection is valid
            await connection.ping();

            // Log the actual query being executed
            console.log('Executing query for username:', username.username);

            // Execute the query
            const [rows] = await connection.query(
                `SELECT * FROM users WHERE username = ?`,
                [username.username]
            );

            // Log the raw result
            console.log('Raw query result:', rows);

            // Check if we got any results
            if (!rows || rows.length === 0) {
                console.log('No user found with username:', username);
                return null;
            }

            return rows[0];
        } catch (err) {
            console.error('Database Query Error:', {
                message: err.message,
                code: err.code,
                sqlState: err.sqlState,
                sql: err.sql
            });
            throw err;
        } finally {
            // Always release the connection back to the pool
            if (connection) {
                connection.release();
                console.log('Database connection released');
            }
        }
    }
    static async findByEmail(email) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(userData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const { username, password, email } = userData;
            console.log('Attempting to create a new user record');
            console.log(username);
            const [result] = await connection.execute(
                'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
                [username, password, email]
            );
            await connection.commit();
            console.log(result);
            return result.insertId;
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async updateUser(id, userData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const { username, email } = userData;
            const [result] = await connection.execute(
                'UPDATE users SET username = ?, email = ? WHERE id = ?',
                [username, email, id]
            );
            await connection.commit();
            return result.affectedRows > 0;
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }

    static async deleteUser(id) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const [result] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);
            await connection.commit();
            return result.affectedRows > 0;
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }
}

module.exports = User;