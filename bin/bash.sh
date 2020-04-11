#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
docker_dir=$(cd $bin_dir/../docker && pwd)
container_name=${1:-zeit_now}

# $container_nameの有無をgrepで調べる
docker ps | grep $container_name

# grepの戻り値$?の評価。 grep戻り値 0:一致した 1:一致しなかった
if [ $? -eq 0 ]; then
  # 一致したときの処理
  cd $docker_dir && docker-compose exec $container_name bash
else
  # 一致しなかった時の処理
  # コンテナを立ち上げて接続
  cd $docker_dir && docker-compose run $container_name /bin/bash
fi


