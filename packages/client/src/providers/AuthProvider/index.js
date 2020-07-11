import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
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