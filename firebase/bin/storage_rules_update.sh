#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)
container_name=firebase
project_name="create-now-6fa17"

cd $docker_dir && docker-compose run $container_name firebase deploy --token "$FIREBASE_TOKEN" --only storage --project $project_name
