#!/bin/bash

export PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
export MINOR_PACKAGE_VERSION=$(perl -pe 's/\.[0-9]+$//' <<< $PACKAGE_VERSION)
export MAJOR_PACKAGE_VERSION=$(perl -pe 's/\.[0-9]+$//' <<< $MINOR_PACKAGE_VERSION)
