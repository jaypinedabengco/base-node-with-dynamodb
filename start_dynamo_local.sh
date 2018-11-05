#!/bin/bash

# run using docker

export DYNAMO_DB_IMAGE=amazon/dynamodb-local
export DYNAMO_CONTAINER_NAME=dynamodb-local-container
export DYNAMO_CONTAINER_PORT=8000
export DYNAMO_VOLUME=dynamo_local

# check if exist & pull dynamodb-local image if not
[ ! -z $(docker images -q $DYNAMO_DB_IMAGE) ] || docker pull $DYNAMO_DB_IMAGE

# stop & remove if container exist
if [ "$(docker ps -q -a -f name=$DYNAMO_CONTAINER_NAME)" ]; then
    docker stop $DYNAMO_CONTAINER_NAME
    docker rm $DYNAMO_CONTAINER_NAME
fi

# run using port 8000
docker run -v $dynamo_local:/dynamodb_local_db -p $DYNAMO_CONTAINER_PORT:8000 -d --name $DYNAMO_CONTAINER_NAME amazon/dynamodb-local

# access
echo "access shell via http://localhost:$DYNAMO_CONTAINER_PORT/shell"