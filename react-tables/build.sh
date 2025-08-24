#!/bin/bash

npm run build
# Copy CSS to dist/css directory
mkdir -p ./dist/css
cp ./src/css/react-tables.css ./dist/css/

mkdir -p ./example/node_modules/@rare-earth/react-tables/
cp -r ./dist ./example/node_modules/@rare-earth/react-tables/
cp ./package.json ./example/node_modules/@rare-earth/react-tables/
cp ./index.js ./example/node_modules/@rare-earth/react-tables/
npm run build --prefix ./example/
