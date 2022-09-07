FROM node:16

ENV SERVICE_HOST=http://localhost:49160
ENV SERVE_PORT=8090

WORKDIR /app/
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 8090
CMD [ "node", "server.js" ]