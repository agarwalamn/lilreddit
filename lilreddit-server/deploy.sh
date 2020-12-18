#!/bin/bash

echo "Enter version"
read VERSION


docker build -t agarwalamn/lilreddit:$VERSION .
docker push agarwalamn/lilreddit:$VERSION

# sever code
# e.g. ssh <ip:address> "command here"