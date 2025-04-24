FROM node:23-slim AS base

WORKDIR /app

COPY package.json tsconfig.json nodemon.json ./

RUN npm install --production && npm install -D typescript nodemon

COPY . .

FROM base AS build
RUN npm run build

FROM node:23-slim AS production
WORKDIR /app
COPY --from=build /app/dist ./dist 
COPY package.json ./
RUN npm install --production
EXPOSE 3000
USER node
CMD ["node", "dist/index.js"]

FROM base AS development
EXPOSE 3000
CMD ["npm", "run", "dev"]
