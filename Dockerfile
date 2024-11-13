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

# Copy built client files
COPY --from=client-builder /app/client /app/client

# Copy API files
COPY --from=api-builder /app/api /app/api

WORKDIR /app
EXPOSE 8080
CMD ["npm", "start"]