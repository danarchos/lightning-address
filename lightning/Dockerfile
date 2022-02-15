# Before making all projects Typescript, in production, check
    # - the npm run build and start works in production 
    # - That COPY ./src /src copies everything needed

FROM node:12.18.1-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY ./src ./src
ENV NODE_PATH='./build'
CMD npm run build && npm start