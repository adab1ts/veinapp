#!/usr/bin/env bash

#
# In order to load your data in your production datastore
# add the flag -p to the calling command as seen below:
#
# $ npm run db:populate -- -f places1.json,places2.csv -p
#

PATH=$PATH:$(npm bin)
PROJECT_ROOT=$(pwd)
DATALOAD_SCRIPT="db/load-data.ts"

function _usage {
  echo "Usage:"
  echo "  $1 -h"
  echo "  $1 -f data_file1[,data_file2] [-p]"
  echo
  echo "Options:"
  echo "  -h             # Print usage information"
  echo "  -f data_files  # Comma separated data files"
  echo "  -p             # Load your data in production"
  echo
  echo "Examples:"
  echo "  $ npm run db:populate -- -f places.json"
  echo "  $ npm run db:populate -- -f places-1.csv,places-2.json -p"
}

function main {
  local data_files=""
  local environment=""

  while getopts ":hpf:" opt; do
    case $opt in
      h)
        _usage $0 && exit 0
        ;;
      p)
        environment="--prod"
        ;;
      f)
        data_files=$OPTARG
        ;;
      \?)
        echo "Invalid option: -$OPTARG" >&2
        _usage $0 && exit 0
        ;;
      :)
        echo "Option -$OPTARG requires an argument" >&2
        _usage $0 && exit 0
        ;;
    esac
  done

  if [[ -z "$data_files" ]]; then
    _usage $0 && exit 0
  fi

  ts-node ${PROJECT_ROOT}/${DATALOAD_SCRIPT} $data_files $environment
  exit 0
}

if [[ "${BASH_SOURCE[0]}" = "${0}" ]]; then
  main "$@"
fi
