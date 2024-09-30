FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5005

ENV MONGODB_URI=mongodb://localhost:27017/simpleblog

# Command to run your application
CMD ["node", "server.js"]
