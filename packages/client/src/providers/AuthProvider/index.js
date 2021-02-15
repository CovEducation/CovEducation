import React, { useState, useEffect, useContext, createContext } from 'react';

import { Auth,Db } from '../FirebaseProvider';
import { 
    getUser, 
    createMentorWithEmail, 
    createParentWithEmail, 
    getUserDetailByEmail, 
    sendRequest,
    getRequests, 
    acceptStudentRequest, 
    updateSessionHours, 
    updateRatingss,
    getSpeakerSeriesList,
    getTeamDataList,
    saveProfileData
 } from '../../api';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
    const [request, setRequest] = useState(null);
    const [requestOther, setRequestOther] = useState(null);
    const [speakerSeries, setSpeakerSeries] = useState(null);
    const [teamData, setTeamData] = useState(null);
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
            var a = await createMentorWithEmail(email, password, user);
            if(a.success){
                setAuthState(AUTH_STATES.LOGGED_IN);
            }
            return a;
        } else {
           var a = await createParentWithEmail(email, password, user);
           if(a.success){
                setAuthState(AUTH_STATES.LOGGED_IN);
            }
            return a;
        }
        
    }

    /**
     * Signs the current user out.
     */
    const signout = () => {
        Auth.signOut()
            .then(() => {
                setUser(null);
                setAuthState(AUTH_STATES.LOGGED_OUT);
                window.location.href = window.location.origin;
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
    const getUserDataByEmail = async (email) => {
        await getUserDetailByEmail(email);
    }
   
    const sendRequestToMentor = async(email,studentID,studentName,message) => {
        await sendRequest(email, studentID,studentName,message)
        .then(() => {
            console.log("Request Send successfully.");
        })
        .catch((err) => {
            console.log(`Error Sending Request: ${err}`);
        });
    }

    const getRequestList = async() => {
        await getRequests(["Pending"])
        .then((request) => {
            setRequest(request)
        })
        .catch((err) => {
            console.log(`Error fetching Request: ${err}`);
            setRequest(null);
        });
    }

    const getPendingRequestList = async() => {
        await getRequests(["Pending"])
        .then((request) => setRequestOther(request))
        .catch((err) => {
            console.log(`Error fetching Request: ${err}`);
            setRequestOther(null);
        });
    }

    const acceptRequest = async (messageID, status, studentName) => {
        await acceptStudentRequest(messageID, status, studentName)
        .then(() => {
            var a = getRequests(["Pending"])
            .then((request) => setRequest(request))
            .catch((err) => {
                console.log(`Error fetching Request: ${err}`);
                setRequest(null);
            });
        })
        .catch((err) => {
            console.log(`Error fetching Request: ${err}`);
        });
    }

    const archiveRequest = async (messageID, status, studentName) => {
        await acceptStudentRequest(messageID, status, studentName)
        .then(() => {console.log('request Archived'); 
        var a = getRequests(["Pending"])
        .then((request) => setRequest(request))
        .catch((err) => {
            console.log(`Error fetching Request: ${err}`);
            setRequest(null);
        });})
        .catch((err) => {
            console.log(`Error fetching Request: ${err}`);
        });
    }

    const rejectRequest = async (messageID, status, studentName) => {
        await acceptStudentRequest(messageID, status, studentName)
        .then(() => {console.log('request Rejected'); 
        var a = getRequests(["Pending"])
        .then((request) => setRequest(request))
        .catch((err) => {
            console.log(`Error fetching Request: ${err}`);
            setRequest(null);
        });})
        .catch((err) => {
            console.log(`Error fetching Request: ${err}`);
        });
    }

    const updateSessionHoursss = async (messageID, hours, studentName) => {
        await updateSessionHours(messageID, hours, studentName)
        .then(() => {console.log('session hours updated'); 
        var a = getRequests(["Pending"])
        .then((request) => setRequest(request))
        .catch((err) => {
            console.log(`Error fetching Request: ${err}`);
            setRequest(null);
        });
})
        .catch((err) => {
            console.log(`Error fetching Request: ${err}`);
        });
    }

    const updateRatings = async (messageID, ratings, studentName) => {
        await updateRatingss(messageID, ratings, studentName)
        .then(() => {console.log('ratings updated'); 
        var a = getRequests(["Pending"])
        .then((request) => setRequest(request))
        .catch((err) => {
            console.log(`Error fetching Request: ${err}`);
            setRequest(null);
        });
       })
        .catch((err) => {
            console.log(`Error fetching Request: ${err}`);
        });
    }

    const saveProfileDetails = async(uid,data) => {
        await saveProfileData(uid,data)
        .then((data) => {
            alert("Profile was saved successfully.");
            setUser(data);
        })
        .catch((err) => {
            console.log(`Error saving profile: ${err}`);
        });
    }


    // 
    const getSpeakerSeries = async() => {
        await getSpeakerSeriesList()
        .then((data) => setSpeakerSeries(data))
        .catch((err) => {
            console.log(`Error fetching Speaker Series: ${err}`);
            setSpeakerSeries(null);
        });
    }

    const setUserData = async(data) => {
        setUser(data);
    }


    const getTeamData = async() => {
        await getTeamDataList()
        .then((data) => setTeamData(data))
        .catch((err) => {
            console.log(`Error fetching Team Data: ${err}`);
            setTeamData(null);
        });
    }
    // TODO this may have to be done synchronously
    // Register firebase state handler
    // Note that this only gets called once on mount
    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged( async (auth) => {
            if (authState === AUTH_STATES.CREATING_USER) {
                // Avoids race-condition between firebase and firestore user creation.
                return;
            }
            if (auth != null) {
                setAuth(auth);
                setAuthState(AUTH_STATES.LOGGED_IN);
            } else {
                setAuthState(AUTH_STATES.LOGGED_OUT);
            }
        });
        return () => unsubscribe();
    }, [authState]);

    // Attempt to fetch the user on update
    useEffect(() => {
        if (authState !== AUTH_STATES.LOGGED_IN) return;

        getCurrentUser()
            .then((user) => setUser(user))
            .catch((err) => {
                console.log(`Error fetching user: ${err}`);
                setUser(null);
            });
            getRequestList();
            getPendingRequestList();
            getSpeakerSeries();
    }, [authState, auth]);
    useEffect(() => {
        getTeamData();
    }, []);
    return {
        auth,
        authState,
        user,
        getUserDataByEmail,
        signin,
        signup,
        signout,
        request,
        requestOther,
        speakerSeries,
        teamData,
        sendRequestToMentor,
        getRequestList,
        acceptRequest,
        rejectRequest,
        archiveRequest,
        updateRatings,
        updateSessionHoursss,
        getPendingRequestList,
        getSpeakerSeries,
        getTeamData,
        saveProfileDetails,
        setUserData
    };
}

export { useAuth as default, AuthProvider };
