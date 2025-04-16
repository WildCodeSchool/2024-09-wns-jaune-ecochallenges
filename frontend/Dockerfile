FROM node:lts-alpine

WORKDIR /app
 ENV CHOKIDAR_USEPOLLING=true

COPY package*.json ./
RUN npm install

COPY vite.config.ts ./
COPY tsconfig* ./
COPY codegen.ts ./
COPY components.json ./
COPY index.html ./
COPY src ./src
COPY public ./public
CMD npm run build
CMD npm run dev
