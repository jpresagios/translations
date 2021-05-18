#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
shift
cmd="$@"

until curl --silent --fail "host"/_cluster/health; do
  >&2 echo "Elastic is sleeping"
  sleep 1
done

>&2 echo "Elastic is up - executing command"
exec $cmd

