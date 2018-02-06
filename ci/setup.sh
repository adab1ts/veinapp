#!/bin/bash

set -ev

# Setup Firebase and Mapbox staging config files
cat src/config/firebase.ts.sample \
    | sed "s/FIREBASE-APP-API-KEY/${FB_STAGING_API_KEY}/g" \
    | sed "s/FIREBASE-APP/${FB_STAGING_APP}/g" \
    | sed "s/FIREBASE-APP-MESSAGING-SENDER-ID/${FB_STAGING_MESSAGING_SENDER_ID}/g" \
    | tee src/config/firebase.ts &>/dev/null

cp src/config/mapbox.ts.sample src/config/mapbox.ts
sed -i "s/MAPBOX-ACCESS-TOKEN/${MB_STAGING_ACCESS_TOKEN}/g" src/config/mapbox.ts

exit 0
