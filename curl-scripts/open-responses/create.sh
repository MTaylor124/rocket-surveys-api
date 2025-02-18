#!/bin/bash

API="http://localhost:4741"
URL_PATH="/openresponses"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "openresponse": {
      "answer": "'"${ANSWER}"'",
      "openSurvey": "'"${OPENSURVEY}"'"
    }
  }'

echo
