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

// Validation Functions
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
    gradeLevels: body.gradeLevels,
    timezone: body.timezone,
  };

  // TODO: validate data

  return mentor;
};

const parseParent = async (body) => {
  const parent = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    pronouns: body.pronouns,
    avatar: body.avatar,
    timezone: body.timezone,
  };

  // TODO: validate data

  return parent;
};

const parseStudent = async (body) => {
  const student = {
    name: body.name,
    email: body.email,
    gradeLevel: body.gradeLevel,
    subjects: body.subjects,
  };

  // TODO: validate data

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

const updateUser = async (uid, body) => {
  const user = await getUser(uid);

  if (user.role === PARENT) {
    console.warn('Updates for Parent objects not supported yet');
    return Promise.resolve(body);
  }

  if (user.role === MENTOR) {
    try {
      const mentor = await mentorsCollectionRef.doc(uid);
      await mentor.set({
        ...body,
      }, {
        merge: true,
      });
      const updated = await mentor.get();

      return updated.data();
    } catch (err) {
      throw new Error(err);
    }
  }

  throw new Error(`Unexpected role: ${user.role}`);
};

module.exports = { getUser, createUser, updateUser };
