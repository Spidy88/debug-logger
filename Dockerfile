FROM node:11.6.0-alpine

RUN mkdir -p /webapp
WORKDIR /webapp

COPY . .

RUN npm install -g yarn
RUN yarn --pure-lockfile

EXPOSE 8888

CMD [ "yarn", "start" ]