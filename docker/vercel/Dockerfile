# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:14.8.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm init -y

# RUN npm i --no-optional next react react-dom ... 速度早くならず
RUN npm i next react react-dom

# TypeScript追加
RUN npm i -D typescript @types/react @types/react-dom @types/node

# resetcss
RUN npm i -D sanitize.css

# Progressive Web Apps (PWA) 対応
RUN npm i -D next-offline

# スタイリング
RUN npm i -D styled-components styled-media-query

# 状態管理
RUN npm i -D @reduxjs/toolkit react-redux redux-logger

# linter formatter
RUN npm i -D eslint eslint-plugin-react prettier eslint-config-prettier eslint-plugin-prettier
RUN npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"lint\": \"eslint --ext .ts,.tsx --ignore-path .gitignore .\", /g" /app/package.json

# TODO: vercel@19.0.0以上 にアップデート
# https://github.com/zeit/now/releases
RUN npm i -g vercel@latest

# vercel loginで出来た認証トークンを保存.一度コンテナを作成した後に追加。
COPY ./com.vercel.cli /root/.local/share/com.vercel.cli/
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev\": \"next dev\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"next build\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"start\": \"next start\", /g" /app/package.json

## canvas library
RUN npm i react-konva konva --save

## pdf

RUN npm i pdfmake

RUN npm i @material-ui/core

## 認証
### 便利ツール lodash
RUN npm i lodash

### session
RUN npm i cookie-session

### fetch
RUN npm i isomorphic-unfetch

### firebase
RUN npm i firebase
RUN npm i react-firebaseui
RUN npm i firebase-admin

## react redux firestore

RUN npm i @material-ui/icons

# next-js tutorial
RUN npm i gray-matter
RUN npm i sass --save-dev
RUN npm i remark remark-html
RUN npm i date-fns

# material-ui tables
RUN npm i material-table

# i18n
RUN npm i rosetta

# drop file
RUN npm i react-dropzone

# classname切替
RUN npm i classnames

# @testing-library/jest-dom
RUN npm i sanitize-html

# visualization
RUN npm i dagre-d3 d3

# file save
RUN npm i file-saver
RUN npm i jszip
RUN npm i crypto-js
RUN npm i dotenv --save-dev

RUN npm i react-draggable
RUN npm i react-resizable
