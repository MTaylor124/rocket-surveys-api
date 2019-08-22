#!/bin/bash

API="http://localhost:4741"
URL_PATH="/opensurveys"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "opensurvey": {
      "question": "'"${QUESTION}"'"
      }
  }'

echo
