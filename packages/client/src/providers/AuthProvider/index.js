import React, { useState, useEffect, useContext, createContext } from 'react';

import { Auth, Mentor } from "../FirebaseProvider";

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
        return Auth.createUserWithEmailAndPassword(email, password);
    }

    const signin = (email, password) => {
        return Auth.signInWithEmailAndPassword(email, password);
    };


    const signout = () => {
        Auth.signOut()
        .then(() => {
            setUser(null)
        });
    };

    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged(async (auth) => {
            if (auth) {
                try {
                    const [mentor, mentee] = await Promise.all(
                        [Mentor.get(auth.uid), Promise.resolve(undefined)]
                    );
                    setUser({auth, mentor, mentee});
                } catch (err) {
                    console.log(err);
                    setUser(null);
                }

            } else {
                setUser(null);
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