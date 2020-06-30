#!/bin/bash

API="http://localhost:8000"
URL_PATH="/all"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \

echo
