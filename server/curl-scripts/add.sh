#!/bin/bash

API="http://localhost:8000"
URL_PATH="/add"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "date": "'"${DATE}"'",
    "feelings": "'"${FEELINGS}"'",
    "zip": "'"${ZIP}"'"
  }'

echo
