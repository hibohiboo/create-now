#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)
container_name=gcloud

# docker-composeの起動。 OAuth用に9005.
cd $docker_dir && docker-compose run -p 9005:9005 $container_name /bin/bash

# gcloud init
# gsutil cors set cors.json gs://create-now-6fa17.appspot.com
