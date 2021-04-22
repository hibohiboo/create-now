# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:14.16.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm init -y

# RUN npm i --no-optional --no-optional next react react-dom ... 速度早くならず
RUN npm i --no-optional next react react-dom

# TypeScript追加
RUN npm i --no-optional -D typescript @types/react @types/react-dom @types/node

# resetcss
RUN npm i --no-optional -D sanitize.css

# Progressive Web Apps (PWA) 対応
RUN npm i --no-optional -D next-offline

# スタイリング
RUN npm i --no-optional -D styled-components styled-media-query

# 状態管理
RUN npm i --no-optional -D @reduxjs/toolkit react-redux redux-logger

# linter formatter
RUN npm i --no-optional -D eslint eslint-plugin-react prettier eslint-config-prettier eslint-plugin-prettier
RUN npm i --no-optional -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"lint\": \"eslint --ext .ts,.tsx --ignore-path .gitignore .\", /g" /app/package.json

# https://github.com/zeit/now/releases
RUN npm i --no-optional -g vercel@latest

# vercel loginで出来た認証トークンを保存.一度コンテナを作成した後に追加。
COPY ./com.vercel.cli /root/.local/share/com.vercel.cli/
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev\": \"next dev\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"next build\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"start\": \"next start\", /g" /app/package.json

## canvas library
RUN npm i --no-optional react-konva konva --save

## pdf

RUN npm i --no-optional pdfmake

# material-ui v4は正式にはreact 17に対応していない
# https://github.com/mui-org/material-ui/issues/23306
# https://blog.watilde.com/2020/10/14/npm-v7%E3%81%AE%E4%B8%BB%E3%81%AA%E5%A4%89%E6%9B%B4%E7%82%B9%E3%81%BE%E3%81%A8%E3%82%81/
RUN npm i --no-optional --legacy-peer-deps @material-ui/core
RUN npm i --no-optional --legacy-peer-deps @material-ui/icons
# material-ui tables
RUN npm i --no-optional --legacy-peer-deps material-table

## 認証
### 便利ツール lodash
RUN npm i --no-optional lodash

### session
RUN npm i --no-optional cookie-session

### fetch
RUN npm i --no-optional isomorphic-unfetch

### firebase
RUN npm i --no-optional firebase
RUN npm i --no-optional firebase-admin
RUN npm i --no-optional --legacy-peer-deps react-firebaseui

## react redux firestore



# next-js tutorial
RUN npm i --no-optional gray-matter
RUN npm i --no-optional sass --save-dev
RUN npm i --no-optional remark remark-html
RUN npm i --no-optional date-fns



# i18n
RUN npm i --no-optional rosetta

# drop file
RUN npm i --no-optional react-dropzone

# classname切替
RUN npm i --no-optional classnames

# @testing-library/jest-dom
RUN npm i --no-optional sanitize-html

# visualization
RUN npm i --no-optional dagre-d3 d3

# file save
RUN npm i --no-optional file-saver
RUN npm i --no-optional jszip
RUN npm i --no-optional crypto-js
RUN npm i --no-optional dotenv --save-dev

RUN npm i --no-optional react-draggable
RUN npm i --no-optional --force react-resizable
RUN npm i --no-optional --legacy-peer-deps react-select

## elm
RUN npm i -D elm
RUN npm i --no-optional -D elm-format
RUN npm i --no-optional -D elm-minify
RUN npm i --no-optional -D elm-webpack-loader
RUN npm i --no-optional -D --legacy-peer-deps elm-hot-webpack-loader
RUN npm i --no-optional -D elm-test
# RUN npm i --no-optional -D elm-verify-examples

# elm-test --watchしたときのpolling設定
RUN sed -i -e "s/\(cwd: projectRootDir,\)/\1\n    usePolling: true, /g" /app/node_modules/elm-test/lib/elm-test.js
RUN npm i --no-optional html2canvas
RUN npm i --no-optional moment
# RUN npm i --no-optional material-table/jspdf
