import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCSyjSnzA5mp8Y3ro904vg_wxMsG3ELsek',
    authDomain: 'coved-test.firebaseapp.com',
    databaseURL: 'https://coved-test.firebaseio.com',
    projectId: 'coved-test',
    storageBucket: 'coved-test.appspot.com',
    messagingSenderId: '779651794617',
    appId: '1:779651794617:web:8b9bf2f99882b58d337d68'
};

firebase.initializeApp(firebaseConfig);

const Auth = firebase.auth();
const Db = firebase.firestore();

export { Auth, Db };