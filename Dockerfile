# Build stage for client
FROM node:18 AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Build stage for API
FROM node:18-slim AS api-builder
WORKDIR /app/api
COPY api/package*.json ./
RUN npm install --production
COPY api/ ./

# Final stage
FROM node:18-slim
WORKDIR /app

# Install serve to serve the built client files
RUN npm install -g serve

# Copy built client files
COPY --from=client-builder /app/client/ /app/client

# Copy API files
COPY --from=api-builder /app/api /app/api

WORKDIR /app/api
EXPOSE 8080

# Start both the backend and the static file server
CMD ["sh", "-c", "serve -s /app/client -l 3000 & npm start"]