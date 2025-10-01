FROM node:20-alpine

WORKDIR /app

# Enable corepack to use pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies first (leverages Docker layer caching)
COPY package.json pnpm-lock.yaml* ./
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else pnpm install; fi

# Copy the rest of the app
COPY . .

# Create necessary directories for volume mounts
RUN mkdir -p .next .turbo

EXPOSE 3000

# Use development command with better file watching
CMD ["pnpm", "dev", "--turbo", "--port", "3000"]


