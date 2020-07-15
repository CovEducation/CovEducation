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

    /**
     * Signs a user up.
     * @param {string} email
     * @param {string} password
     * @param {Mentor|Parent} user object
     *
     * @return {Promise<void>} indicates successful account creation.
     */
    const signup = (email, password, user) => {
        return Auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                return user.create(Auth.currentUser.uid);
            })
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
            setUser(LOGGED_OUT)
        });
    };

    // this handles updating the application user state
    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged(async (auth) => {
            if (auth) {
                try {
                    const [mentor, parent] = await Promise.all([Mentor.get(auth.uid), Parent.get(auth.uid)]);
                    setUser({
                        auth,
                        mentor,
                        parent
                    });

                } catch (err) {
                    // TODO throw an error to be caught by Error Boundaries
                    console.log(err);
                    signout();
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
