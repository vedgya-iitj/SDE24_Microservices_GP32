CREATE DATABASE IF NOT EXISTS userservice;

-- Use the database
USE userservice;

-- Create user table
CREATE TABLE IF NOT EXISTS users (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Create user and grant privileges
CREATE USER IF NOT EXISTS 'microblog'@'%' IDENTIFIED BY 'userservice';
GRANT ALL PRIVILEGES ON userservice.* TO 'microblog'@'%';
FLUSH PRIVILEGES;