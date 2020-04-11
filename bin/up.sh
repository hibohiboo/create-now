#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# up.sh docker-compose.camp.yml
composeFile=${1:-"docker-compose.yml"}

# docker-composeの起動
cd $bin_dir/../docker && docker-compose -f $composeFile up
