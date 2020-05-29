# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:14.3.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc
RUN npm init -y

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

# テストツール
RUN npm i -D jest @testing-library/jest-dom jest-css-modules
RUN npm i -D ts-jest @types/jest
RUN npm i -D @testing-library/react
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"tests\": \"jest src\/__tests__\/.*\/*.spec.tsx?$\", /g" /app/package.json

# Story Book
RUN npx -p @storybook/cli sb init --type react
RUN npm i -D babel-preset-react-app
RUN npm i -D @storybook/addon-knobs @storybook/addon-storysource @storybook/addon-viewport @storybook/addon-backgrounds @storybook/addon-console
## Story Shot
RUN npm i -D @storybook/addon-storyshots @storybook/addon-storyshots-puppeteer puppeteer react-test-renderer
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"puppeteer-storyshots\": \"jest src\/__tests__\/puppeteer-storyshots*.runner.ts\", /g" /app/package.json

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

# vercel loginで出来た認証トークンを保存.一度コンテナを作成した後に追加。
COPY ./com.vercel.cli /root/.local/share/com.vercel.cli/
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"dev\": \"next dev\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"build\": \"next build\", /g" /app/package.json
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"start\": \"next start\", /g" /app/package.json

## canvas library
RUN npm install react-konva konva --save

## pdf

RUN npm install pdfmake

# Node13.12.0、 Now CLI 17.1.1 dev (beta)にアップデートしたら、Watchpack Error (watcher): Error: ENOSPC: System limit for number of file watchers reached, watch '/app/src' が出るようになったため対応
# https://qiita.com/yoshi0518/items/3fe5e162df6c5bd0fe6b
# https://qiita.com/enta0701/items/bc9f8f8c780222979784
# ホストと共有しているようなので、以下をホストで実行
# sudo vi /etc/sysctl.conf
## fs.inotify.max_user_watches= 65536 を末尾に追記
# sudo sysctl -p
# cat /proc/sys/fs/inotify/max_user_watches で変更を確認

RUN npm install @material-ui/core

## 認証
### 便利ツール lodash
RUN npm install lodash

### session
RUN npm install cookie-session

### fetch
RUN npm install isomorphic-unfetch

### firebase
RUN npm install firebase
RUN npm install react-firebaseui
RUN npm install firebase-admin

## react redux firestore

RUN npm install @material-ui/icons

# next-js tutorial
RUN npm install gray-matter
RUN npm install sass --save-dev
RUN npm install remark remark-html
RUN npm install date-fns

# material-ui tables
RUN npm install material-table

# i18n
RUN npm install rosetta

# drop file
RUN npm install react-dropzone

# classname切替
RUN npm install classnames

# @testing-library/jest-dom
RUN npm install sanitize-html

# visualization
RUN npm install dagre-d3 d3
