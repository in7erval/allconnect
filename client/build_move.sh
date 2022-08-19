#!/usr/bin/sh

# shellcheck disable=SC2028
echo "export const API_URL = \"http://62.113.105.82:3001\";" > src/config.js
npm run build
scp -r build root@62.113.105.82:/root/allconnect/client/
echo "export const API_URL = \"\";" > src/config.js
