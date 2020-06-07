#!/bin/bash

# 全てのdockerコンテナを止める
docker stop $(docker ps -q)

# 全てのdockerコンテナを削除
docker rm -f $(docker ps -aq)

# コンテナから参照されていないボリュームの削除
docker volume ls -q -f dangling=true | xargs docker volume rm 