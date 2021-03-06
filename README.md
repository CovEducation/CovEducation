<div align="center">
  <h1><code>CovEducation</code></h1>
</div>

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-oxygen.svg)](https://forthebadge.com)
![Build Status](https://img.shields.io/travis/com/CovEducation/CovEducation/master?style=for-the-badge)

## About
This repository contains the front-end and back-end code for CovEd's revamped website. The website is built using ReactJS, Firebase, and MongoDB.

## 🚴 Usage

### 🐑 Install dependencies
To install dependencies run the following.

```bash
$ npm install
$ npx lerna bootstrap
```

#### Adding New Dependencies

##### Not found in `package.json`
Ensure that you install from the `/packages/client/` directory, NOT the root directory. All dependencies and packages should be added on to either `client` or `server`.

```bash
$ npm uninstall <all new packages>
$ cd packages/client
$ npm install <all new packages>
```

##### `dev-dependencies`
Ensure that non-development (test frameworks, linting, etc) packages are part of `dependencies` and not `dev-dependecies`. To fix it:
```bash
$ npm uninstall <all new packages>
$ npm install <all packages>
```

### 🛠️ Build

#### `.env` files
In `packages/client`, there is a `.env.development` file which contains configuration for Firebase. These lines are injected when developing locally, and can be referenced in code like so: `process.env.REACT_APP_FIREBASE_API_KEY`. During build time, these references are replaced with actual values by the CI server in the final output bundle. More documentation here: https://create-react-app.dev/docs/adding-custom-environment-variables/


#### Development Server
This will start the live reload servers for both the back-end API and the react client.
```bash
$ npm start
```

#### Production Mode
This will build the client and start the server in production mode
```bash
$ npm run production
```

### 🧪Testing
Run the following command to run all tests
```bash
$ npm test
```
#### Linting
If there are a lot of errors regarding the linting, run the following command to run it locally
```bash
$ npx lerna run lint
```
**Caveat:** Do NOT attempt to install `eslint` as a package as it will break the code. Use the above code, but install all necessary extensions (most code editors already support it).

## 🔋 Batteries Included
* ExpressJS
* MongoDB
* ReactJS
* Testing with Jest and Supertest (read about it [here](https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/))
