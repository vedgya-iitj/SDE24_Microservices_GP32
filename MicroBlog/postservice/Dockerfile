FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5002

ENV MONGODB_URI_POSTS=mongodb://localhost:27017/posts

# Command to run your application
CMD ["node", "server.js"]
