FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY vite.config.ts vite.config.ts
COPY postcss.config.js postcss.config.js
COPY tailwind.config.js tailwind.config.js
COPY tsconfig* ./
COPY index.html index.html
COPY src src
COPY public public

CMD npm run dev
