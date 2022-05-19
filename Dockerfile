FROM node:14-alpine

ADD . /src
WORKDIR /src
RUN yarn install
