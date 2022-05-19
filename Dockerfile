FROM node:16-alpine

ADD . /src
WORKDIR /src
RUN yarn install
