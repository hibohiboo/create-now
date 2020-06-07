FROM php:7.4-cli
WORKDIR /app
# https://tsyama.hatenablog.com/entry/docker-not-found-npm
RUN apt-get -y update
RUN apt-get install -y \
  curl \
  gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g
RUN npm install -g uglify-js

# uglifyではes6をminifyできない問題
