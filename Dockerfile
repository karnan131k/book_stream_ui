# Stage 1: Build the Angular application
FROM node:20 as build-stage

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build the Angular app
COPY . .
RUN npm run build --prod

# Stage 2: Serve the application with NGINX
FROM nginx:latest

# Copy the built application from the previous stage
COPY --from=build-stage /app/dist/book_stream_ui/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]