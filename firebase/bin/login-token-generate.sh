#!/bin/bash
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)

# docker-composeの起動。 OAuth用に9005を開放。
cd $docker_dir  && docker-compose run -p 9005:9005 firebase firebase login:ci
