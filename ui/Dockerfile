FROM node:10-alpine as builder

RUN mkdir -p /usr/src/buildoutput
WORKDIR /usr/src/buildoutput

COPY . /usr/src/buildoutput
RUN yarn
RUN yarn build

FROM node:10-alpine
RUN yarn global add serve
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=builder /usr/src/buildoutput/build .
CMD ["serve", "-s", "."]
EXPOSE 5000
