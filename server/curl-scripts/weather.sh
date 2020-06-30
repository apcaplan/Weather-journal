#!bin/bash

API="http://localhost:8000"
URL_PATH="/weather"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "zip": "'"${ZIP}"'"
  }'

echo
