#!/bin/bash

set -ev

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    firebase deploy --project $FB_PROD_PROJECT --token $FB_PROD_TOKEN
fi

exit 0
