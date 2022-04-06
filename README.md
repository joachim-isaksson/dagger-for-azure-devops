# How to build

## Install node, I'm using node 16.

> cd dagger-for-azure-devops

> npm install

> npm install typescript@4.0.2 -g --save-dev

> npm i -g @vercel/ncc

> npm i -g tfx-cli

## Compile ts files to corresponding js files in src

> tsc

## Remove the need to include all node modules in the package, bundle it all up in dist

> ncc build src/main.js --license licenses.txt

## Package for azure devops

Edit vss-extension.json to point to your own publisher
<https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task> is a useful page

> cd ..

> tfx extension create --manifest-globs vss-extension.json

## Then you can upload to the marketplace and test.
