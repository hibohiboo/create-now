# https://firebase.google.com/docs/functions/get-started?authuser=0
# firebase cloud function はv8で動作
FROM node:12.18.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# firebase
RUN yarn global add firebase-tools
RUN yarn add --dev firebase-tools

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"firebase\": \"firebase\", /g" /app/package.json
