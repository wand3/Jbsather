# ---------- Base image ----------
FROM node:18.20.5-bullseye-slim

# Set environment
ENV NODE_ENV=development

# Create app directory
WORKDIR /backend

# Install OS deps only if native modules are needed
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Copy dependency manifests first (for caching)
COPY package.json package-lock.json ./

# Install only development dependencies
RUN npm ci --only=dev

# Ensure ts-node and TypeScript exist in container
RUN npm install -D ts-node typescript

# Copy application source
COPY src ./src

# Expose API port
EXPOSE 3000

# Start the API
CMD ["npm", "run", "dev"]
