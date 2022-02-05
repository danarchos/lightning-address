FROM node:12.18.1-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY ./src ./src
COPY ./public ./public
COPY ./tsconfig.json ./tsconfig.json
CMD npm start