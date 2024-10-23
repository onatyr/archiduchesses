# apps/api/Dockerfile

# Use the official Node.js image.
FROM node:18

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json files.
COPY package.json package-lock.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build TypeScript files.
RUN npm run build

# Expose the application port.
EXPOSE 3000

# Command to run the application.
CMD ["node", "dist/index.js"]
