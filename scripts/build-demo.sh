#!/bin/bash

rm -rf public/
mkdir -p public/assets/javascript public/assets/images
cp -r textures public/assets/images/
cp -r demo/assets/* public/assets/
cp demo/index.html public/
npm run bundle:demo
