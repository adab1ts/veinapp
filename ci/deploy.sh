#!/bin/bash

set -ev

if [ "${TRAVIS_BRANCH}" = "staging" ]; then
    firebase deploy --project $FB_STAGING_PROJECT --token $FB_PROD_TOKEN

elif [ "${TRAVIS_BRANCH}" = "master" ]; then
    firebase deploy --project $FB_PROD_PROJECT --token $FB_PROD_TOKEN
fi

exit 0
