FROM node:20-alpine3.20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# set on build time
ENV APP_URL="http://localhost:8080/"
RUN sed -i 's#http://localhost:8080/#'"$APP_URL"'#g' src/environments/environment.ts
RUN npm run build

FROM node:20-alpine3.20

WORKDIR /app
RUN npm install express
EXPOSE 4000
COPY --from=builder /app/dist/shiro-questions .
COPY proxy-server.mjs .
ENTRYPOINT ["node", "proxy-server.mjs"]
