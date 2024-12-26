# Frontend Dockerfile
FROM node:19 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/<angular-app-name> /usr/share/nginx/html
EXPOSE 80