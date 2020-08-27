// Set of API endpoints available to all pages. This should make the get, post, update, and delete
// requests necessary.
// TODO: Handle profile pictures and set them as the photoURL.
import { post, get } from './utilities.js';
import { Auth } from './providers/FirebaseProvider/index.js';

const Roles = {
    MENTOR: 'MENTOR',
    PARENT: 'PARENT',
}

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
    return await get('/users', {}, {token});
}

const createUserWithEmail = async (email, password, data, role) => {
    let token = undefined;
    try {
        await Auth.createUserWithEmailAndPassword(email, password);
        token = await Auth.currentUser.getIdToken();
        await post('/users', { role: role, ...data}, { token });
        await Auth.currentUser.sendEmailVerification();
        
    } catch (err) {
        if (token) await Auth.currentUser.delete();
        throw new Error(`Error creating ${role}: ${err}`);
    }
}