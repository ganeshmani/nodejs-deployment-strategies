FROM node:14-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY . /usr/src/app/
RUN npm ci --production && npm cache clean --force
USER node
EXPOSE 8080

CMD ["node","server.js"]


