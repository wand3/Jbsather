# ---------- Base image ----------
FROM node:18.20.5-bullseye-slim

# Set environment
ENV NODE_ENV=development

# Create app directory
WORKDIR /app

# Install OS deps only if native modules are needed
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Copy dependency manifests first (for caching)
COPY package.json package-lock.json ./


# Install ALL dependencies (don't use --omit=dev because you need Vite)
RUN npm install --include=optional

# Install only production dependencies
# RUN npm ci --omit=dev

# Copy application source
COPY . .

# Expose the port Vite uses (typically 5173)
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev"]
