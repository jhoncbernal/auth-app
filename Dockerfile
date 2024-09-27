# Build Stage
FROM node:18.17-alpine AS BUILD_IMAGE
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package*.json ./
RUN pnpm install
COPY . .
RUN npx prisma generate
RUN pnpm run build


# Production Stage
FROM node:18.17-alpine AS PRODUCTION_STAGE
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=BUILD_IMAGE /app/.env* ./
COPY --from=BUILD_IMAGE /app/package*.json ./
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/prisma ./prisma
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
ENV NODE_ENV=production
ARG EXPOSE_APP_PORT
ENV EXPOSE_APP_PORT=$EXPOSE_APP_PORT
EXPOSE $EXPOSE_APP_PORT