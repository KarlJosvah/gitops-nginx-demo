# Stage 1: Build React static bundle using Node Alpine
FROM node:20-alpine AS client-builder
WORKDIR /build
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Install production Express dependencies
FROM node:20-alpine AS server-builder
WORKDIR /build
COPY server/package*.json ./
RUN npm install --only=production

# Stage 3: Final lightweight runner image
FROM node:20-alpine
WORKDIR /app

COPY --from=server-builder /build/node_modules ./node_modules
COPY server/ ./
COPY --from=client-builder /build/dist ./public

EXPOSE 8080
USER node

CMD ["node", "server.js"]