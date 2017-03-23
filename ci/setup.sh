#!/bin/bash

set -ev

# Setup Firebase and Mapzen staging config files
cat src/config/firebase.ts.sample \
    | sed "s/FIREBASE-APP-API-KEY/${FB_STAGING_API_KEY}/g" \
    | sed "s/FIREBASE-APP/${FB_STAGING_APP}/g" \
    | sed "s/FIREBASE-APP-MESSAGING-SENDER-ID/${FB_STAGING_MESSAGING_SENDER_ID}/g" \
    | tee src/config/firebase.ts &>/dev/null

cp src/config/mapzen.ts.sample src/config/mapzen.ts
sed -i "s/MAPZEN-API-KEY/${MZ_STAGING_API_KEY}/g" src/config/mapzen.ts

exit 0
