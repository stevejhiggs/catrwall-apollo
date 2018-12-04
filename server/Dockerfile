FROM node:10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN yarn

EXPOSE 4000
CMD [ "yarn", "start" ]
