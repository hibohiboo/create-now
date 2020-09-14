# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:14.10.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm init -y

# テストツール
RUN npm i -D jest @testing-library/jest-dom jest-css-modules
RUN npm i -D ts-jest @types/jest
RUN npm i -D @testing-library/react
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tests\": \"jest tests\/__tests__\/.*\/*.spec.tsx?$\", /g" /app/package.json

# Story Book
RUN npx -p @storybook/cli sb init --type react
RUN npm i -D babel-preset-react-app
RUN npm i -D @storybook/addon-knobs @storybook/addon-storysource @storybook/addon-viewport @storybook/addon-backgrounds @storybook/addon-console
## Story Shot
RUN npm i -D @storybook/addon-storyshots @storybook/addon-storyshots-puppeteer puppeteer react-test-renderer
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"puppeteer-storyshots\": \"jest tests\/__tests__\/puppeteer-storyshots*.runner.ts\", /g" /app/package.json

### puppetieer troubleshooting
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*


# TODO: vercel@19.0.0以上 にアップデート
# https://github.com/zeit/now/releases
RUN npm i -g vercel@latest

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev\": \"next dev\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"next build\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"start\": \"next start\", /g" /app/package.json


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


## canvas library
RUN npm i react-konva konva --save

## pdf

RUN npm i pdfmake

# Node13.12.0、 Now CLI 17.1.1 dev (beta)にアップデートしたら、Watchpack Error (watcher): Error: ENOSPC: System limit for number of file watchers reached, watch '/app/tests' が出るようになったため対応
# https://qiita.com/yoshi0518/items/3fe5e162df6c5bd0fe6b
# https://qiita.com/enta0701/items/bc9f8f8c780222979784
# ホストと共有しているようなので、以下をホストで実行
# sudo vi /etc/sysctl.conf
## fs.inotify.max_user_watches= 65536 を末尾に追記
# sudo sysctl -p
# cat /proc/sys/fs/inotify/max_user_watches で変更を確認

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
# window is not defined の問題が 1.64.0 で起きているので、一旦64.2にする
# https://github.com/mbrn/material-table/issues/2112
# RUN npm update material-table lodash sass
# RUN npm i material-table@1.62.0

RUN npm i react-draggable
RUN npm i react-resizable
RUN npm i react-select
## elm
RUN npm i -D elm
RUN npm i -D elm-format
RUN npm i -D elm-minify
RUN npm i -D elm-webpack-loader
RUN npm i -D elm-hot-webpack-loader
RUN npm i -D elm-test
RUN npm i -D elm-verify-examples

# elm-test --watchしたときのpolling設定
RUN sed -i -e "s/\(cwd: projectRootDir,\)/\1\n    usePolling: true, /g" /app/node_modules/elm-test/lib/elm-test.js
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"elm-test\": \"elm-test --watch\", /g" /app/package.json
