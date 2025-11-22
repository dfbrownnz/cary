# Stage 1: Dependency Installation (using a slim node image)
# This stage installs dependencies and builds the project.
FROM node:20-slim AS base

# Set the working directory inside the container
WORKDIR /app

# Install dependencies needed for the build (like Next.js build tools)
FROM base AS deps
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    git \
    pkg-config

# Copy package files to install dependencies
COPY package.json yarn.lock package-lock.json* pnpm-lock.yaml* ./
RUN npm install

# Stage 2: Build the Next.js application
FROM base AS builder
WORKDIR /app

# Copy dependency results from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables for the build (if needed)
# ENV NEXT_PUBLIC_...=... 

# Build the application
RUN npx next build

# Stage 3: Production Image (Minimal and Secure)
# Use a minimal node environment to run the built application
FROM node:20-slim AS runner
WORKDIR /app

# Set NEXT_TELEMETRY_DISABLED to 1 to prevent sending telemetry data
ENV NEXT_TELEMETRY_DISABLED 1

# If using serverless functions/standalone output, Next.js saves the app inside .next/standalone
# Copy the built app, node_modules, and public files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set the port the application will listen on
ENV PORT 3000

# Expose the port
EXPOSE 3000

# Command to run the application
# Use node server.js when running standalone output
CMD ["node", "server.js"]

# Build the Image: Run this command from your project's root:
# docker build -t my-nextjs-app .

# Run the Container:
# docker run -p 3000:3000 my-nextjs-app