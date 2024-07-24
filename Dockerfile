# Use the official Node.js image as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./
# If using Yarn, replace the above line with:
# COPY yarn.lock ./

# Install dependencies
RUN npm install
# If using Yarn, replace the above line with:
# RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Build the Next.js application
RUN npm run build
# If using Yarn, replace the above line with:
# RUN yarn build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
# If using Yarn, replace the above line with:
# CMD ["yarn", "start"]