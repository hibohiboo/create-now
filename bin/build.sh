#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)
dist_dir=$(cd $parent_dir/dist && pwd)
container_name=${1:-zeit_now}

cd $docker_dir && docker-compose run -e NODE_ENV=production $container_name /bin/bash -c  'yarn build --prod'

# vendor_dir=$(cd $parent_dir/.. && pwd)
# root_dir=$(cd $vendor_dir/.. && pwd)
# public_dir=$(cd $root_dir/app/public && pwd)

