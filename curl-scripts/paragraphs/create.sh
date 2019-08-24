#!/bin/bash

API="http://localhost:4741"
URL_PATH="/paragraphs"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "paragraph": {
      "answer": "'"${ANSWER}"'",
      "question": "'"${QUESTION}"'"
    }
  }'

echo
