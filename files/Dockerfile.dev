
FROM node:lts-alpine
WORKDIR /app
RUN apk --no-cache add curl
COPY *.json .
RUN npm install
COPY src src
RUN mkdir public

CMD npm run dev
