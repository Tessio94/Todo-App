FROM node:20-alpine AS base
WORKDIR /usr/src/app


# 1. Install dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production


# 2. Build final image
FROM base AS runtime

# Create non-root user
USER node

ENV NODE_ENV=production

# Copy node_modules from deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy the application source
COPY --chown=node:nodegroup . .

EXPOSE 3000

CMD ["node", "index.js"]