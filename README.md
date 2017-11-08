# Network-Setup

An Electron/React windows app to help switch between multiple network configurations quickly.

[![Build status](https://ci.appveyor.com/api/projects/status/jcxfv93wl7b3bynj?svg=true)](https://ci.appveyor.com/project/ashleymarkfletcher/network-setup)
[![codecov](https://codecov.io/gh/ashleymarkfletcher/network-setup/branch/master/graph/badge.svg)](https://codecov.io/gh/ashleymarkfletcher/network-setup)

## To Run - Development

1. Clone or download this repository
2. `npm install` in the root folder
3. `npm start` to start create-react-app
4. `npm run electron-dev` to run the electron app

## To Run - "Production"

1. `npm run build` in the root folder
2. `npm run electron-pack`

after that there should be an exe to install the app with.

## Structure

* react code is in src
* electron/node code is in Public due to being part of the build process
