// Set of API endpoints available to all pages. This should make the get, post, update, and delete
// requests necessary.
// TODO: Handle profile pictures and set them as the avatar.
import { post, get } from './utilities.js';
import { Auth } from './providers/FirebaseProvider/index.js';

const Roles = {
    MENTOR: 'MENTOR',
    PARENT: 'PARENT',
}

// const host = process.env.REACT_APP_COVED_API;
const host = window.location.origin+'/';
export const getMentor = async () => await getUser(Roles.MENTOR);

export const getParent = async () => await getUser(Roles.PARENT);

export const createParentWithEmail = async (email, password, parent) => {
    return await createUserWithEmail(email, password, parent, Roles.PARENT);
};

export const createMentorWithEmail = async (email, password, mentor) => {
    return await createUserWithEmail(email, password, mentor, Roles.MENTOR);
};

export const getUser = async () => {
    if (Auth.currentUser === undefined || Auth.currentUser === null) {
        throw Error('Unable to retrive user data with uninitilized Auth user.');
    }
    const token = await Auth.currentUser.getIdToken();
    return await get(host + 'users', {}, {token});
}

const createUserWithEmail = async (email, password, data, role) => {
    let token = undefined;
    try {
        await Auth.createUserWithEmailAndPassword(email, password);
        token = await Auth.currentUser.getIdToken();
        await post(host + 'users', { role: role, ...data}, { token });
        await Auth.currentUser.sendEmailVerification();
        return {success:1,message:"User Created Successfully."}
    } catch (err) {
        if (token) await Auth.currentUser.delete();
        return {success:0,message:err}
    }
}

export const getUserDetailByEmail = async (email) => {
    return await post(host + 'getUserbyEmail', {email: "jamesgonzalez@ross-hill.biz"}, {  });
};

export const sendRequest = async (email,studentID,studentName,message) => {
    if (Auth.currentUser === undefined || Auth.currentUser === null) {
        throw Error('Unable to retrive user data with uninitilized Auth user.');
    }
    const token = await Auth.currentUser.getIdToken();
    return await post(host + 'request/sendRequest', {mentorEmailAddress: email, message: message, parentId: Auth.currentUser.uid, studentID, studentName}, {token});
}

export const saveProfileData = async (uid, data) => {
    if (Auth.currentUser === undefined || Auth.currentUser === null) {
        throw Error('Unable to retrive user data with uninitilized Auth user.');
    }
    const token = await Auth.currentUser.getIdToken();
    var a = await post(host + 'users/saveProfile', {uid: uid, dataToSave: JSON.stringify(data)});
    console.log("a", a);
    return a;
};

export const getRequests = async (arr) => {
    if (Auth.currentUser === undefined || Auth.currentUser === null) {
        throw Error('Unable to retrive user data with uninitilized Auth user.');
    }
    const token = await Auth.currentUser.getIdToken();
    return await post(host + 'request/getRequests', {id : Auth.currentUser.uid, status: arr}, {token});
}


export const acceptStudentRequest = async (messageID, status, studentName) => {
    if (Auth.currentUser === undefined || Auth.currentUser === null) {
        throw Error('Unable to retrive user data with uninitilized Auth user.');
    }
    const token = await Auth.currentUser.getIdToken();
    return await post(host + 'request/changeRequestStatus', {mentorUID : Auth.currentUser.uid, messageID:messageID, requestStatus: status, studentName: studentName}, {token});
}

export const updateSessionHours = async (messageID, hours, studentName) => {
    if (Auth.currentUser === undefined || Auth.currentUser === null) {
        throw Error('Unable to retrive user data with uninitilized Auth user.');
    }
    const token = await Auth.currentUser.getIdToken();
    return await post(host + 'request/updateSessionHours', {mentorUID : Auth.currentUser.uid, messageID:messageID, sessionHours: hours, studentName: studentName}, {token});
}

export const updateRatingss = async (messageID, ratings, studentName) => {
    if (Auth.currentUser === undefined || Auth.currentUser === null) {
        throw Error('Unable to retrive user data with uninitilized Auth user.');
    }
    const token = await Auth.currentUser.getIdToken();
    return await post(host + 'request/updateRatings', {mentorUID : Auth.currentUser.uid, messageID:messageID, ratings: ratings, studentName: studentName}, {token});
}

export const getSpeakerSeriesList = async () => {
    if (Auth.currentUser === undefined || Auth.currentUser === null) {
        throw Error('Unable to retrive user data with uninitilized Auth user.');
    }
    const token = await Auth.currentUser.getIdToken();
    return await post(host + 'staticData/getSpeakerSeries', {}, {token});
}

export const getTeamDataList = async () => {
    // if (Auth.currentUser === undefined || Auth.currentUser === null) {
    //     throw Error('Unable to retrive user data with uninitilized Auth user.');
    // }
    // const token = await Auth.currentUser.getIdToken();
    return await post(host + 'staticData/getTeamData', {}, {});
}