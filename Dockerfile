FROM node:14-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY . /usr/src/app/
RUN npm install --production
USER node
EXPOSE 80

CMD ["node","server.js"]


