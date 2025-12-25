
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Set database environment for build-time (Prisma needs this during next build prerendering)
ENV DATABASE_URL="file:./prisma/dev.db"

# Ensure the prisma directory exists and a dummy DB file is created/initialized
RUN mkdir -p ./prisma && touch ./prisma/dev.db

RUN npx prisma generate && npx prisma db push --skip-generate

ARG NEXT_PUBLIC_Stripe_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_Stripe_PUBLISHABLE_KEY=$NEXT_PUBLIC_Stripe_PUBLISHABLE_KEY

ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID

ARG GOOGLE_CLIENT_SECRET
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET

ARG AUTH_SECRET
ENV AUTH_SECRET=$AUTH_SECRET

ARG AUTH_URL
ENV AUTH_URL=$AUTH_URL

ARG AUTH_TRUST_HOST
ENV AUTH_TRUST_HOST=$AUTH_TRUST_HOST

# Increase Node memory to prevent OOM during build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Keep ARG/ENV for runtime overrides if needed, but build already has what it needs above
ARG DATABASE_URL="file:./prisma/dev.db"
ENV DATABASE_URL=$DATABASE_URL

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts

# Install prisma and netcat explicitly for runtime migrations and health checks
ENV NPM_CONFIG_PREFIX=/home/nextjs/.npm-global
ENV PATH=$PATH:/home/nextjs/.npm-global/bin
RUN apk add --no-cache netcat-openbsd
RUN npm install -g prisma@5.22.0 bcryptjs @prisma/client

ENV NODE_PATH=/home/nextjs/.npm-global/lib/node_modules

# Set permissions for the startup script
RUN chmod +x scripts/startup.sh

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME="0.0.0.0"

# Wait for DB to be ready before running migrations and starting server
CMD ["sh", "./scripts/startup.sh"]
