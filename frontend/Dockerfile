FROM node:lts-alpine

WORKDIR /app
ENV CHOKIDAR_USEPOLLING=true

COPY package*.json ./
RUN npm install

COPY vite.config.ts vite.config.ts
COPY tsconfig* ./
COPY codegen.ts codegen.ts
COPY components.json components.json
COPY index.html index.html
COPY src src
COPY public public

CMD npm run dev
