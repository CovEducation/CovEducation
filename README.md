<div align="center">

  <h1><code>CovEducation</code></h1>

  <strong>Built with 💖</strong>
</div>

[![Build Status](https://travis-ci.com/CovEducation/CovEducation.svg?branch=master)](https://travis-ci.com/CovEducation/CovEducation)

## About
This repository contains the frontend and backend code for CovEd's revamped website. The website is built using ReactJS, Firebase, and MongoDB.

## 🚴 Usage

### 🐑 Install dependencies
To install dependencies run the following.

```bash
$ npm install
$ npx lerna bootstrap
```

#### Dependency Errors

##### Not found in `package.json`
Ensure that you install from the `/packages/client/` directory, NOT the root directory. All dependecies and packages should be added on to either `client` or `server`. 

```bash
$ npm uninstall <all new packages>
$ cd packages/client
$ npm install <all new packages>
```

##### `dev-dependecies`
Ensure that the package is part of `dependencies` not `dev-dependecies`. To fix it:
```bash
$ npm uninstall <all new packages>
$ npm install <all packages>
```

### 🛠️ Build 

#### Development Server
This will start the live reload servers for both the backend api and the react client.
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

## 🔋 Batteries Included
* ExpressJS
* MongoDB
* ReactJS
* Testing with Jest and Supertest (read about it [here](https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/))
