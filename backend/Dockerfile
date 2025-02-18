FROM node:lts-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY nodemon.json nodemon.json
RUN npm i
RUN npm install --save-dev nodemon
RUN npm i -D nodemon ts-node concurrently
COPY src src
CMD npm run dev
