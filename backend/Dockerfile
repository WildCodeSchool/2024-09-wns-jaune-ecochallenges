FROM node:lts-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json tsconfig.json
RUN npm i
COPY src src
CMD npm run start
