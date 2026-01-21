# ---------- Base image ----------
FROM node:18.20.5-bullseye-slim

# Set environment
ENV NODE_ENV=production

# Create app directory
WORKDIR /frontend

# Install OS deps only if native modules are needed
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Copy dependency manifests first (for caching)
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy application source
COPY src ./src

# Expose API port
EXPOSE 6000

# Start the API
# CMD ["node", "src/server.js"]
CMD ["npm", "run", "dev"]
    