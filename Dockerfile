# Use the Puppeteer image as the base
FROM ghcr.io/puppeteer/puppeteer:21.3.8

# Install Tesseract and other dependencies
RUN apt-get update && apt-get install -y tesseract-ocr

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set a working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for npm ci
COPY package*.json ./
RUN npm ci

# Copy the rest of your application files
COPY . .

# Create a directory for output files and grant write access
RUN mkdir -p /usr/src/app/output
RUN chmod -R 777 /usr/src/app/output

# Expose the port your Node.js app might run on
EXPOSE 10000

# Start your Node.js application
CMD [ "node", "index.js" ]
