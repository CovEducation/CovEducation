import React, { useState, useEffect, useContext, createContext } from 'react';

import { Auth } from '../FirebaseProvider';
import { getUser, createMentorWithEmail, createParentWithEmail } from '../../api';

export const AUTH_STATES  = {
    LOGGED_OUT: 'LOGGED_OUT',
    LOGGED_IN:  'LOGGED_IN',
    UNINITIALIZED: 'UNINITIALIZED',
    CREATING_USER: 'CREATING_USER',
};

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
               { value => value.auth !== AUTH_STATES.UNINITIALIZED ? children : fallback }
            </authContext.Consumer>
        </authContext.Provider>
    )
}

const useAuth = () => {
    return useContext(authContext);
}



const useAuthProvider = () => {
    const [authState, setAuthState] = useState(AUTH_STATES.UNINITIALIZED);
    const [auth, setAuth] = useState(null);
    const [user, setUser] = useState(null);

    /**
     * Signs a user in. This triggers pulling the correct user information.
     * @param {string} email
     * @param {string} password
     *
     * @return {Promise<firebase.auth.UserCredential>} the user credentials
     */
    const signin = (email, password) => {
        setAuthState(AUTH_STATES.LOGGED_IN);
        return Auth.signInWithEmailAndPassword(email, password).catch(() => {
            setAuthState(AUTH_STATES.LOGGED_OUT);
        });
    };

    const signup = async (email, password, user) => {
        if (user.role !== 'MENTOR' && user.role !== 'PARENT') {
            throw Error(`Role invariant broken, unexpected role type: ${user.role}`)
        }
        setAuthState(AUTH_STATES.CREATING_USER);
        if (user.role === 'MENTOR') {
            await createMentorWithEmail(email, password, user);
        } else {
            await createParentWithEmail(email, password, user);
        }
        setAuthState(AUTH_STATES.LOGGED_IN);
    }

    /**
     * Signs the current user out.
     */
    const signout = () => {
        Auth.signOut()
            .then(() => {
                setUser(null);
                setAuthState(AUTH_STATES.LOGGED_OUT);
            });
    };

    /**
     * Gets the current user if possible
     *
     * @return {Promise<Mentor|Parent>} the current logged in user
     */
    const getCurrentUser = async () => {
        if (authState !== AUTH_STATES.LOGGED_IN) {
            return Promise.reject('No user currently logged in.');
        }  
        // Query for the user if not cached.
        if (user) {
            return Promise.resolve(user);
        }
        return getUser();
        
    };

    // Register firebase state handler
    // Note that this only gets called once on mount
    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged(async (auth) => {
            if (authState === AUTH_STATES.CREATING_USER) {
                // Avoids race-condition between firebase and firestore user creation.
                return;  
            }
            if (authState === AUTH_STATES.LOGGED_IN) {
                setAuth(auth);
            }
        });
        return () => unsubscribe();
    }, [authState]);

    // Attempt to fetch the user on update
    useEffect(() => {
        getCurrentUser()
            .then((user) => setUser(user))
            .catch((err) => {
                console.log(`Error fetching user: ${err}`);
                setUser(null);
            });
    });

    return {
        auth,
        authState,
        user,
        signin,
        signup,
        signout
    };
}

export { useAuth as default, AuthProvider };
