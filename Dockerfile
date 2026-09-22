FROM node:24-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source
COPY . .

# Set environment variables for Vite to bind to all interfaces
ENV HOST=0.0.0.0
ENV PORT=4173

# Expose the application port
EXPOSE 4173

# Start the application
CMD ["npm", "run", "dev"]
