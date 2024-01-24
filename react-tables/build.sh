#!/bin/bash

npm run build
mkdir -p ./example/node_modules/@rare-earth/react-tables/
cp -r ./dist ./example/node_modules/@rare-earth/react-tables/
npm run build --prefix ./example/
