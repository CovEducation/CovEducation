const firebase = require('firebase-admin');
const db = firebase.firestore();

const usersCollectionRef = db.collection('users');
const mentorsCollectionRef = db.collection('mentors');
const parentsCollectionRef = db.collection('parents');

const MENTOR = 'MENTOR';
const PARENT = 'PARENT';

const getDoc = async (collection, uid) => {
    const obj = await db.collection(collection).doc(uid).get();

    if (obj.exists) {
        return obj.data();
    }

    throw (`Unable to find '${uid}' in '${collection}' collection`);
}

// These are the three main methods to interact with the user schemas

const getUser = async (uid) => {
    const userDoc = await getDoc('users', uid);

    let user;
    if (userDoc.role === MENTOR) {
        user = await getDoc('mentors', uid);
    } else if (userDoc.role === PARENT) {
        user = await getDoc('parents', uid);
        const studentSnapshot = await parentsCollectionRef.doc(uid).collection('students').get();
        user.students = studentSnapshot.docs.map(s => s.data());
    }

    user.role = userDoc.role;

    return user;
}



const createUser = async (uid, body) => {
    // TODO user yup data validation.
    const user = {
        role: body.role,
    }

    const batch = db.batch();
    batch.set(usersCollectionRef.doc(uid), user);

    if (user.role == MENTOR) {
        const mentor = await parseMentor(body);
        batch.set(mentorsCollectionRef.doc(uid), mentor);

    } else if (user.role == PARENT) {
        const parent = await parseParent(body);
        batch.set(parentsCollectionRef.doc(uid), parent);

        for (const i in body.students) {
            console.log(body.students[i])
            const newStudent = await parseStudent(body.students[i]);
            const newStudentRef = parentsCollectionRef.doc(uid).collection('students').doc();
            batch.set(newStudentRef, newStudent);
        }
    } else {
        throw "Unexpected role: " + body.role;
    }

    await batch.commit();
}

const updateUser = async (uid) => {

}

// Helper function
const parseMentor = async (body) => {
    const mentor = {
        name: body.name,
        email: body.email,
        pronouns: body.pronouns,
        college: body.college,
        avatar: body.avatar,
        bio: body.bio,
        major: body.major,
        tags: body.tags,
        subjects: body.subjects,
        major: body.major,
        gradeLevels: body.gradeLevels,
        timzone: body.timezone
    };

    // TODO: validate data

    return mentor;
}

const parseParent = async (body) => {
    const parent = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        pronouns: body.pronouns,
        avatar: body.avatar,
        timezone: body.timezone,
    }

    // TODO: validate data

    return parent;
}

const parseStudent = async (body) => {
    const student = {
        name: body.name,
        email: body.email,
        gradeLevel: body.gradeLevel,
        subjects: body.subjects
    }

    // TODO: validate data

    return student;
}

module.exports = { getUser: getUser, createUser: createUser, updateUser: updateUser };