# Stage 1: Build the Docusaurus site
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY aides/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY aides/ ./

# Build the site
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy x6 library (for graph rendering)
COPY aides/static/x6.min.js /usr/share/nginx/html/x6.min.js

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
