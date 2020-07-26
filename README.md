<div align="center">
  <h1><code>CovEducation</code></h1>
</div>

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

### Translations
To reach a broader audience, the website supports multiple languages. We use `react-i18next` to handle translation, which will load translations from `packages/client/public/locales` based on the user's settings. For strings which haven't yet been translated to other languages, English (`en`) is the default fallback langauge.


#### Adding translations
Translations can be added in a few easy steps!

1. Identify a string that needs to be shown in different languages. This button is a good example, since we would want "find a mentor" to show up in the user's preferred language.

```jsx
<Button>Find a mentor</Button>
```

2. Locate the JSON files in `packages/client/public/locales`. Refer to this [list of locale codes](https://developer.chrome.com/webstore/i18n#localeTable) if the one you are adding translations for a language that is currently not supported. Then, pick a key for your string and add appropriate translations to all languages.

```json
// en/translation.json
{
  "findAMentor": "Find a mentor"
}

// de/translation.json
{
  "findAMentor": "Finde einen Mentor"
}
```

3. Use the translation in your component. For the button example, we would change it like so:

```jsx
import { useTranslation } from 'react-i18next';
const Button = () => {
  const { t } = useTranslation();
  
  // translation key is 'findAMentor'
  return <Button>t('findAMentor')</Button>;
}
```

If you need more complex behavior, like interpolation, you can use the `<Trans>` component which will attempt to translate all children. Read more about it [here](https://react.i18next.com/latest/trans-component).

## 🔋 Batteries Included
* ExpressJS
* MongoDB
* ReactJS
* Testing with Jest and Supertest (read about it [here](https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/))
