# Use the latest Node.js LTS version (22.14.0)
FROM node:22.14.0

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

# Copy the source code and build the app
COPY . .
RUN npm run build
