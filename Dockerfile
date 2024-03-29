FROM node:21-alpine3.19

RUN npm install -g nodemon

WORKDIR /transaction-tracker-api

COPY package*.json ./

RUN npm install

COPY src ./src

CMD ["npm", "run", "dev"]