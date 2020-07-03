import React, { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCSyjSnzA5mp8Y3ro904vg_wxMsG3ELsek",
    authDomain: "coved-test.firebaseapp.com",
    databaseURL: "https://coved-test.firebaseio.com",
    projectId: "coved-test",
    storageBucket: "coved-test.appspot.com",
    messagingSenderId: "779651794617",
    appId: "1:779651794617:web:8b9bf2f99882b58d337d68"
};

firebase.initializeApp(firebaseConfig);

const authContext = createContext();

export function AuthProvider({ children }) {
    const auth = useAuthProvider();

    return (
        <authContext.Provider value={auth}>{children}</authContext.Provider>
    )
}

export function useAuth() {
    return useContext(authContext);
}

export function useAuthProvider() {
    const [user, setUser] = useState(null);

    const signin = (email, password) => {
        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            setUser(res.user);
            return user; 
        });
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
        });

        return () => unsubscribe()
    }, []);

    return {
        user, 
        signin, 
        signout
    }
}