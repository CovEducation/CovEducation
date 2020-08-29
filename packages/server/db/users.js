const Yup = require('yup');

const firebase = require('firebase-admin');

const db = firebase.firestore();
db.settings({ ignoreUndefinedProperties: true });

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

  throw new Error(`Unable to find '${uid}' in '${collection}' collection`);
};

const phoneRegex = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
);

const mentorSchema = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required('Email Required'),
  name: Yup
    .string()
    .required('Name Required'),
  timezone: Yup
    .string()
    .required('Timezone Required'),
  phone: Yup
    .string()
    .matches(phoneRegex, 'Phone number is not valid'),
  pronouns: Yup
    .string(),
  college: Yup
    .string(),
  avatar: Yup
    .string()
    .required('Avatar Required'),
  bio: Yup
    .string()
    .required('Bio Required'),
  major: Yup
    .string(),
  subjects: Yup
    .array()
    .required('Subjects Required'),
  gradeLevels: Yup
    .array()
    .required('Grade Levels Required'),
});
const parentSchema = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required('Email Required'),
  name: Yup
    .string()
    .required('Name Required'),
  timezone: Yup
    .string()
    .required('Timezone Required'),
  phone: Yup
    .string()
    .matches(phoneRegex, 'Phone number is not valid'),
  pronouns: Yup
    .string(),
  avatar: Yup
    .string()
    .required('Avatar Required'),
});
const studentSchema = Yup.object().shape({
  email: Yup
    .string()
    .email(),
  name: Yup
    .string()
    .required('Name Required'),
  subjects: Yup
    .array()
    .required('Subjects Required'),
  grade: Yup
    .number()
    .required('Grade Required'),
});

// Validation Functions
const parseMentor = (body) => {
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
    gradeLevels: body.gradeLevels,
    timezone: body.timezone,
  };

  /**
   * The validation asynchronously checks the data against the restrictions of Yup
   * TODO: More validation needs to be done on how the error is returned to the server.
   */
  async function validate() {
    const valid = await mentorSchema.isValid(mentor);
  }
  validate().then(() => true);

  return mentor;
};

const parseParent = (body) => {
  const parent = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    pronouns: body.pronouns,
    avatar: body.avatar,
    timezone: body.timezone,
  };

  /**
   * The validation asynchronously checks the data against the restrictions of Yup
   * TODO: More validation needs to be done on how the error is returned to the server.
   */
  async function validate() {
    const valid = await parentSchema.isValid(parent);
  }
  validate().then(() => true);

  return parent;
};

const parseStudent = (body) => {
  const student = {
    name: body.name,
    email: body.email,
    gradeLevel: body.gradeLevel,
    subjects: body.subjects,
  };

  /**
   * The validation asynchronously checks the data against the restrictions of Yup
   * TODO: More validation needs to be done on how the error is returned to the server.
   */
  async function validate() {
    const valid = await studentSchema.isValid(student);
  }
  validate().then(() => true);

  return student;
};

// These are the three main methods to interact with the user schemas
const getUser = async (uid) => {
  const userDoc = await getDoc('users', uid);
  let user;
  if (userDoc.role === MENTOR) {
    user = await getDoc('mentors', uid);
  } else if (userDoc.role === PARENT) {
    user = await getDoc('parents', uid);
    const studentSnapshot = await parentsCollectionRef.doc(uid).collection('students').get();
    user.students = studentSnapshot.docs.map((s) => s.data());
  }

  user.role = userDoc.role;

  return user;
};

const createUser = async (uid, body) => {
  const user = {
    role: body.role,
  };

  const batch = db.batch();
  batch.set(usersCollectionRef.doc(uid), user);

  if (user.role === MENTOR) {
    const mentor = await parseMentor(body);
    batch.set(mentorsCollectionRef.doc(uid), mentor);
  } else if (user.role === PARENT) {
    const parent = await parseParent(body);
    batch.set(parentsCollectionRef.doc(uid), parent);

    body.students.forEach(async (student) => {
      const newStudent = await parseStudent(student);
      const newStudentRef = parentsCollectionRef.doc(uid).collection('students').doc();
      batch.set(newStudentRef, newStudent);
    });
  } else {
    throw new Error(`Unexpected role: ${body.role}`);
  }

  return batch.commit();
};

// const updateUser = async (uid) => {
//   // TODO
// };

module.exports = { getUser, createUser };
