import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

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

const authContext = createContext(null);

const AuthProvider = ({ children, fallback }) => {
    const auth = useAuthProvider();

    return (
        <authContext.Provider value={auth}>
            <authContext.Consumer>
               { value => value.initialized ? children : fallback }
            </authContext.Consumer>
        </authContext.Provider>
    )
}

const useAuth = () => {
    return useContext(authContext);
}

const useAuthProvider = () => {
    const [user, setUser] = useState(null);
    const [initialized, setInitialized] = useState(false);

    const signup = (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    const signin = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    const signout = () => {
        firebase.auth().signOut()
        .then(() => {
            setUser(false)
        });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
            setInitialized(true);
        });

        return () => unsubscribe()
    }, []);

    return {
        user,
        initialized,
        signup,
        signin,
        signout
    }
}

export { useAuth as default, AuthProvider };