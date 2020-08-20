import React, { useState, useEffect, useContext, createContext } from 'react';

import { Auth } from '../FirebaseProvider';
import { Mentor, Parent } from '../../models';

const authContext = createContext(null);

/**
 * AuthProvider class to inject the UserContext into child components
 */
const AuthProvider = ({ children, fallback }) => {
    const auth = useAuthProvider();

    // this renders the fallback component until firebase has initialized
    return (
        <authContext.Provider value={auth}>
            <authContext.Consumer>
               { value => value.auth !== AUTH_STATE.UNINITIALIZED ? children : fallback }
            </authContext.Consumer>
        </authContext.Provider>
    )
}

const useAuth = () => {
    return useContext(authContext);
}

// TODO: possibly create a enum struct or flag
export const AUTH_STATE  = {
    LOGGED_OUT: 'LOGGED_OUT',
    LOGGED_IN:  'LOGGED_IN',
    UNINITIALIZED: 'UNINITIALIZED'
};


const useAuthProvider = () => {
    const [auth, setAuth] = useState(AUTH_STATE.UNINITIALIZED);
    const [user, setUser] = useState(null);

    /**
     * Signs a user up.
     * @param {string} email
     * @param {string} password
     * @param {Mentor|Parent} user object
     *
     * @return {Promise<void>} indicates successful account creation.
     */
    const signup = async (email, password, user) => {
        const creds = await Auth.createUserWithEmailAndPassword(email, password);
        const token = await creds.user.getIdToken();

        await fetch('/users', {
            method: 'POST',
            headers: { 'token' : token, 'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        });

        await Auth.currentUser.sendEmailVerification();
    };

    /**
     * Signs a user in. This triggers pulling the correct user information.
     * @param {string} email
     * @param {string} password
     *
     * @return {Promise<firebase.auth.UserCredential>} the user credentials
     */
    const signin = (email, password) => {
        return Auth.signInWithEmailAndPassword(email, password);
    };

    /**
     * Signs the current user out.
     */
    const signout = () => {
        Auth.signOut()
        .then(() => {
            setAuth(AUTH_STATE.LOGGED_OUT);
            setUser(null);
        });
    };

    // register firebase state handler
    // note that this only gets called once on mount
    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged(async (auth) => {
            if (auth) {
                setAuth(auth);

                // TODO error handling
                const token = await auth.getIdToken();
                const res = await fetch('/users', { headers : { token: token }});
                const user = await res.json();
                setUser(user)

            } else {
                setAuth(AUTH_STATE.LOGGED_OUT);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        auth,
        user,
        signup,
        signin,
        signout
    };
}

export { useAuth as default, AuthProvider };
