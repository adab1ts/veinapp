#!/bin/bash

set -ev

if [ "${TRAVIS_BRANCH}" = "staging" ]; then
    # Trigger the build
    ng build -aot

elif [ "${TRAVIS_BRANCH}" = "master" ]; then
    # Setup Firebase and Mapzen production config files
    cat src/config/firebase.ts.sample \
        | sed "s/FIREBASE-APP-API-KEY/${FB_PROD_API_KEY}/g" \
        | sed "s/FIREBASE-APP/${FB_PROD_APP}/g" \
        | sed "s/FIREBASE-APP-MESSAGING-SENDER-ID/${FB_PROD_MESSAGING_SENDER_ID}/g" \
        | tee src/config/firebase.prod.ts &>/dev/null

    cp src/config/mapzen.ts.sample src/config/mapzen.prod.ts
    sed -i "s/MAPZEN-API-KEY/${MZ_PROD_API_KEY}/g" src/config/mapzen.prod.ts

    # Trigger the production build
    ng build -aot -prod
fi

exit 0
