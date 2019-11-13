FROM node:6

WORKDIR /usr/src/app
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production

RUN npm install
COPY . .
EXPOSE 3000
ENV INTERFACES=all
ENV REDIS_URL=redis://host.docker.internal:6379
CMD [ "npm", "start" ]

