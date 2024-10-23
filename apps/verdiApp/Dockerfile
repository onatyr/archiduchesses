# apps/verdiApp/Dockerfile

# Use the official Node.js image.
FROM node:18 as build-stage

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json files.
COPY package.json package-lock.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN npm run build

# Use nginx for serving the application.
FROM nginx:alpine

# Copy the built application from the previous stage.
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose the application port.
EXPOSE 80

# Command to run the nginx server.
CMD ["nginx", "-g", "daemon off;"]
