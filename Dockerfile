FROM node:10-alpine
LABEL name=zemoga version=latest

# Install yarn and other dependencies via apk
RUN apk update \
  && apk add --no-cache tzdata \
  && cp /usr/share/zoneinfo/US/Eastern /etc/localtime \
  && echo "US/Eastern" > /etc/timezone \
  && apk del tzdata \
  && apk add python g++ make \
  && rm -rf /var/cache/apk/*

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src && cp -ar /tmp/node_modules /usr/src
WORKDIR /usr/src
COPY . /usr/src



EXPOSE 8080

CMD ["npm", "start"]