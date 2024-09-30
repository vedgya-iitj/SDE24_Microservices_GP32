FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

ENV MONGODB_URI_USERS=mongodb://localhost:27017/users

# Command to run your application
CMD ["node", "server.js"]
