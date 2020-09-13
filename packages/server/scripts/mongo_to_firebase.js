// Firebase boilerplate.
const firebase = require('firebase-admin');
const fs = require('fs');
const serviceAccount = require('../service_account.json');
const userDb = require('../db/users');

const MENTOR_BACKUP_PATH = './tests/scripts/testMentor.json';
const MENTEE_BACKUP_PATH = './tests/scripts/testMentee.json';

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

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

/**
 * Converts the MongoDB mentor to a new Firebase mentor
 * @param {Mentor} oldMentor - old MongoDB mentor object
 */
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
  return userDb.createUser(oldMentor.uid, adaptedMentor);
};

// const CURRENT_MENTORS = JSON.parse(fs.readFileSync(MENTOR_BACKUP_PATH));
// CURRENT_MENTORS.map((mentor) => addOldMentorToNewSite(mentor));

/**
 * Converts the MongoDB parent to a new Firebase parent
 * @param {Parent} oldParent - old MongoDB parent object
 */
const addOldParentToNewSite = (oldParent) => {
  const adaptedParent = {
    email: oldParent.email,
    name: oldParent.name,
    timezone: oldParent.timezone,
    phone: '',
    pronouns: '',
    avatar: '/images/stockParent.png',
    students: [{
      email: oldParent.student_email,
      name: oldParent.student_name,
      subjects: [''],
      gradeLevel: oldParent.grade_level,
    }],
  };
  return userDb.createUser(oldParent.uid, adaptedParent);
};

// const CURRENT_PARENTS = JSON.parse(fs.readFileSync(MENTEE_BACKUP_PATH));
// CURRENT_PARENTS.map((parent) => addOldParentToNewSite(parent));

module.exports = {
  addOldMentorToNewSite: addOldMentorToNewSite(),
  addOldParentToNewSite: addOldParentToNewSite()
};
