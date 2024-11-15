FROM node:16

WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y default-mysql-client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

#ENV MONGODB_URI_USERS=mongodb://localhost:27017/users
#MONGODB_URI_USERS=mongodb://localhost:27017/users
ENV MYSQL_HOST=mysql_users
ENV MYSQL_USER=microblog
ENV MYSQL_PASSWORD=userservice
ENV MYSQL_DATABASE=userservice

ENV PORT=5001

# Command to run your application
CMD ["node", "server.js"]
