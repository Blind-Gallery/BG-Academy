# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.19.1
FROM node:${NODE_VERSION}-alpine

# Set environment to production
ENV NODE_ENV production

# Install dependencies
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/root/.yarn \
    yarn install --production --frozen-lockfile --verbose

# Install Chromium and other required dependencies
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont

# Specify Puppeteer's Chromium path
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Create necessary directories and set permissions for the node user
RUN mkdir -p /home/node/Downloads /app \
    && chown -R node:node /home/node \
    && chown -R node:node /app

# Switch to non-root user
USER node

# Copy application files
COPY . .

# Expose port and start application
EXPOSE 3000
CMD yarn start
