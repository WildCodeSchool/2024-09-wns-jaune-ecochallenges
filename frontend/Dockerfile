# Étape 1 — build de l'app Vite
FROM node:lts-alpine as builder

WORKDIR /app

# Copie et installation des deps
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

# Build Vite (frontend)
RUN npm run build

# Étape 2 — serveur statique avec serve
FROM node:lts-alpine

WORKDIR /app
RUN npm install -g serve

# Copie le build depuis l'étape précédente
COPY --from=builder /app/dist ./dist

# Expose le port utilisé par serve (identique à vite par défaut)
EXPOSE 5173

# Commande pour servir le build
CMD ["serve", "-s", "dist", "-l", "5173"]
