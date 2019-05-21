#!/bin/bash
set -e

CHANGED_FILES=`git diff --name-only --cached --relative | grep '\.jsx\?$' | xargs`

if [ "$CHANGED_FILES" != "" ]; then
  npm run lint:changed -- $CHANGED_FILES
  if [ $? -ne 0 ]; then exit 1; fi
fi
