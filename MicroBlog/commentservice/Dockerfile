FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5003

ENV MONGODB_URI_COMMENTS=mongodb://localhost:27017/comments

# Command to run your application
CMD ["node", "server.js"]
