# frontend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

# --- producción ---
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app ./
EXPOSE 3000

CMD ["npm", "run", "start"]
