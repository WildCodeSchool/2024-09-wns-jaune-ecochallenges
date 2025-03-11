FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY vite.config.ts vite.config.ts
COPY tsconfig* ./
COPY components.json components.json
COPY index.html index.html
COPY src src
COPY public public

CMD npm run dev
