MicroBlog

## Overview
MicroBlog is based on a microservices architecture with separate user, post, and comment services.

## Features
- User Registration
- User Login
- Create and Manage Posts
- Comment on Posts
- View All Posts and Comments

## Technologies Used
- Node.js
- Express
- MongoDB
- Bootstrap (for frontend styling)

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

Clone the repository:
```bash
git clone https://github.com/vedgya-iitj/SDE_Microservice_G32.git
```

### Docker instructions:
Each microservice has its own Dockerfile and a docker compose as well.
Use:
```
docker compose-up
```

## Local Installation:
Use npm install to install the dependencies for each service.
```
npm install 
```

Mongo DB
Run the command to initiate Mongo DB
```
mongod
```

npm to run the servers
Navigate to each directory where server.js is present and run
```
node server.js
```

