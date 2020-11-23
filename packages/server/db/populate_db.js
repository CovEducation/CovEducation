require('dotenv').config();
const firebase = require('firebase-admin');
const fs = require('fs');

const firebaseCredentials = JSON.parse(fs.readFileSync(process.env.FIREBASE_CREDENTIALS || './service_account.json'));
if (!firebaseCredentials) {
  throw new Error('Cannot find google service account credentials');
}
firebase.initializeApp({
  credential: firebase.credential.cert(firebaseCredentials),
  databaseURL: process.env.FIREBASE_URL,
});

const Users = require('./users');

const userData = JSON.parse(fs.readFileSync('./random.json'))

for (let i = 0; i < userData.parents.length; ++i) {
    const parent = userData.parents[i];
    parent.role = 'PARENT';

    console.log('creating user ' + parent.name)

    firebase.auth().createUser(
        {
            email: parent.email,
            password: parent.password
        }
    )
    .then((user) => {
        Users.createUser(user.uid, parent)
            .then(() => console.log("created user " + parent.name))
            .catch(err => console.log(err))
    });
}

for (let i = 0; i < userData.mentors.length; ++i) {
    const mentor = userData.mentors[i];
    mentor.role = 'MENTOR';

    console.log('creating user ' + mentor.name)

    firebase.auth().createUser(
        {
            email: mentor.email,
            password: mentor.password
        }
    )
    .then((user) => {
        Users.createUser(user.uid, mentor)
            .then(() => console.log("created user " + mentor.name))
            .catch(err => console.log(err))
    });
}

