// Firebase boilerplate.
const firebase = require('firebase-admin');
const fs = require('fs');
const serviceAccount = require('../service_account.json');

const {
    createUser,
} = require('../db/users');

const BACKUP_PATH = ''; // Later.
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
});

// firebase setup
// the google service account file path should be in FIREBASE_CREDENTIALS
// the database name should be in FIREBASE_URL
const firebaseCredentials = JSON.parse(fs.readFileSync(process.env.FIREBASE_CREDENTIALS || './service_account.json'));
if (!firebaseCredentials) {
    throw new Error('Cannot find google service account credentials');
}
firebase.initializeApp({
    credential: firebase.credential.cert(firebaseCredentials),
    databaseURL: process.env.FIREBASE_URL,
});

const addOldMentorToNewSite = (oldMentor) => {
    const adaptedMentor = {
        email: oldMentor.email,
        name: oldMentor.name,
        timezone: oldMentor.timezone,
        bio: oldMentor.bio,
        major: oldMentor.major,
        subjects: oldMentor.subjects,
        avatar: '/images/stockMentor.png',
        gradeLevels: oldMentor.grade_levels_to_mentor,
        pronouns: '',
        college: '',
        phone: '',
        role: 'MENTOR',
    };
    return createUser(oldMentor.uid, adaptedMentor);
};

const CURRENT_MENTORS = JSON.parse(fs.readFileSync(BACKUP_PATH));

CURRENT_MENTORS.map((mentor) => addOldMentorToNewSite(mentor));

const addOldParentToNewSite = (oldParent) => {
    const adaptedParent = {
        email: oldParent.email,
        name: oldParent.name,
        timezone: oldParent.timezone,
        phone: '',
        pronouns: '',
        avatar: '/images/stockParent.png',
        students: [
            {
                email: oldParent.student_email,
                name: oldParent.student_name,
                subjects: [''],
                gradeLevel: oldParent.grade_level
            },
        ],
    };
    return createUser(oldParent.uid, adaptedParent);
};
