FROM node:16

ENV SERVICE_HOST=http://localhost:49160
ENV PORT=8090

WORKDIR /app/
COPY package*.json ./
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 8090
CMD [ "node", "server.js" ]