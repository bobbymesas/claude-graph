# syntax=docker/dockerfile:1

# ── Stage 1: build ────────────────────────────────────────────────
# Compile content/nodes/*.md → data/nodes-compiled.js (Node built-ins only, no npm install).
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN node build.js

# ── Stage 2: runtime ──────────────────────────────────────────────
# Serve the static output with nginx. No Node runtime shipped to production.
FROM nginx:1.27-alpine
COPY --from=builder /app/index.html  /usr/share/nginx/html/index.html
COPY --from=builder /app/app.js      /usr/share/nginx/html/app.js
COPY --from=builder /app/styles.css  /usr/share/nginx/html/styles.css
COPY --from=builder /app/data        /usr/share/nginx/html/data
EXPOSE 80
