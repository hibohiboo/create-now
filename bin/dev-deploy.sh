#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)
container_name=${1:-zeit_now}

cd $docker_dir && docker-compose run -e NODE_ENV=production $container_name /bin/bash -c  'vercel'


