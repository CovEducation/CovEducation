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
    const signup = (email, password, user) => {
        let userType = '';
        if (user instanceof Mentor) {
            userType = 'mentor';
        } else if (user instanceof Parent) {
            userType = 'parent';
        } else {
            return Promise.reject(`Error creating account: Unexpected user type: ${userType}`);
        }

        return Auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                const updateDisplayName = Auth.currentUser.updateProfile({displayName: userType});
                return Promise.all([user.create(Auth.currentUser), updateDisplayName]);
            })
            .then(() => {
                // since the database updates were successful we don't have to query again
                setUser(user);
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
            setAuth(AUTH_STATE.LOGGED_OUT);
            setUser(null);
        });
    };

    /**
     * Gets the current user if possible
     *
     * @return {Promise<Mentor|Parent>} the current logged in user
     */
    const getCurrentUser = () => {
        if (auth === AUTH_STATE.UNINITIALIZED || auth === AUTH_STATE.LOGGED_OUT) {
            return Promise.reject('No user currently logged in.');
        } else {
            // query user for user data if already not cached
            if (user) {
                return Promise.resolve(user);
            }

            let userProm;
            if (auth.displayName === 'mentor') {
                userProm = Mentor.get(auth);
            } else if (auth.displayName === 'parent') {
                userProm = Parent.get(auth);
            } else {
                return Promise.reject('Unexpected user type.');
            }

            return userProm;
        }
    };

    // register firebase state handler
    // note that this only gets called once on mount
    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged(async (auth) => {
            if (auth) {
                setAuth(auth);
            } else {
                setAuth(AUTH_STATE.LOGGED_OUT);
            }
        });

        return () => unsubscribe();
    }, []);

    // attempt to fetch the user on update
    useEffect(() => {
        getCurrentUser()
            .then((user) => {
                setUser(user)
            })
            .catch((err) => {
                console.log(err);
                setUser(null);
            });
    });

    return {
        auth,
        user,
        signup,
        signin,
        signout
    };
}

export { useAuth as default, AuthProvider };
