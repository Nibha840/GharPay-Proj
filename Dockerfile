# Build stage for frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY pg-lead-hub-main/package*.json ./
RUN npm install
COPY pg-lead-hub-main/ .
RUN npm run build

# Final stage - Backend with frontend
FROM node:18-alpine
WORKDIR /app

# Copy server files
COPY server/package*.json ./
RUN npm install

# Copy server source
COPY server/ .

# Copy built frontend to public directory
COPY --from=frontend-builder /app/frontend/dist ./public

EXPOSE 5000

CMD ["node", "server.js"]
