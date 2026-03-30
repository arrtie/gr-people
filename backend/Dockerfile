FROM node:22-alpine
WORKDIR /workspace
COPY package.json package-lock.json ./
COPY types.ts ./types.ts
COPY backend ./backend
RUN npm ci
WORKDIR /workspace/backend
ENV NODE_ENV=production
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/index.js"]
