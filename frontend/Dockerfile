FROM node:22-alpine AS builder
WORKDIR /workspace
COPY package.json package-lock.json ./
COPY types.ts ./types.ts
COPY frontend ./frontend
ARG BACKEND_INTERNAL_URL=http://backend:3001
ENV BACKEND_INTERNAL_URL=${BACKEND_INTERNAL_URL}
RUN npm ci && npm run build --workspace=frontend

FROM node:22-alpine AS runner
WORKDIR /workspace
ENV NODE_ENV=production
COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/package-lock.json ./
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/types.ts ./types.ts
COPY --from=builder /workspace/frontend ./frontend
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace=frontend"]
