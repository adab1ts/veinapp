#!/bin/bash

set -ev

if [ "${TRAVIS_BRANCH}" = "staging" ]; then
    # Trigger the build
    ng build -aot

elif [ "${TRAVIS_BRANCH}" = "master" ]; then
    # Setup Firebase and Mapbox production config files
    cat src/config/firebase.ts.sample \
        | sed "s/FIREBASE-APP-API-KEY/${FB_PROD_API_KEY}/g" \
        | sed "s/FIREBASE-APP/${FB_PROD_APP}/g" \
        | sed "s/FIREBASE-APP-MESSAGING-SENDER-ID/${FB_PROD_MESSAGING_SENDER_ID}/g" \
        | tee src/config/firebase.prod.ts &>/dev/null

    cp src/config/mapbox.ts.sample src/config/mapbox.prod.ts
    sed -i "s/MAPBOX-ACCESS-TOKEN/${MB_PROD_ACCESS_TOKEN}/g" src/config/mapbox.prod.ts

    # Trigger the production build
    ng build -aot -prod
fi

exit 0
