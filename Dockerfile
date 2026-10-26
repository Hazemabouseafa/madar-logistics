# ==========================================
# Multi-Stage Dockerfile for Coolify & VPS
# Madar Logistics and Transportation
# ==========================================

# 1. Base dependencies stage
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

RUN npm ci

# 2. Builder stage
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client & Build Next.js in standalone mode
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npx prisma generate
RUN npm run build

# 3. Production runner stage
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Create non-root user for container security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Create data directory for local fallback storage if needed
RUN mkdir -p /app/.data && chown -R nextjs:nodejs /app/.data

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
