# Use a base image with a lightweight Linux distribution
FROM node:16-buster

# Install LaTeX (TeX Live)
RUN apt-get update && apt-get install -y texlive texlive-latex-extra texlive-fonts-recommended texlive-fonts-extra texlive-xetex

# Set up working directory and install necessary dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Copy the application code into the container
COPY . .

# Expose the port for the application (if you have a web server)
EXPOSE 3000

# Default command to start the app (if using Node.js)
CMD ["npm", "start"]
