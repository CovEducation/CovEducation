import React, { useState, useEffect, useContext, createContext } from 'react';

import { Auth } from '../FirebaseProvider';
import { Mentor, Parent } from '../../models';

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

// TODO: possibly create a enum struct or flag
export const LOGGED_OUT = "LOGGED_OUT";

const useAuthProvider = () => {
    const [user, setUser] = useState(null);
    const [initialized, setInitialized] = useState(false);

    const signup = (email, password) => {
        return Auth.createUserWithEmailAndPassword(email, password);
    };

    const signin = (email, password) => {
        return Auth.signInWithEmailAndPassword(email, password);
    };

    const signout = () => {
        Auth.signOut()
        .then(() => {
            setUser(LOGGED_OUT)
        });
    };

    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged(async (auth) => {
            if (auth) {
                try {
                    // only one of the promises should resolve
                    const [mentor, parent] = await Promise.all(
                        [Mentor.get(auth.uid), Parent.get(auth.uid)]
                    );
                    setUser({ auth, mentor, parent });
                } catch (err) {
                    setUser(LOGGED_OUT);
                }
            } else {
                setUser(LOGGED_OUT);
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
    };
}

export { useAuth as default, AuthProvider };
