#!/bin/bash

npm run build
cp -r ./dist ./example/node_modules/@rare-earth/react-tables/
npm run build --prefix ./example/
