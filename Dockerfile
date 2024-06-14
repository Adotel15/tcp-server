FROM node:20.10.0-alpine

WORKDIR /http_server

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "start:production" ]