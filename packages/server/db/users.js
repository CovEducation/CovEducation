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

  throw new Error(`Unable to find '${uid}' in '${collection}' collection`);
};

// Validation Functions
const parseMentor = async (body) => {
  const mentor = {
    uid: body.uid,
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
    uid: body.uid,
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
    uid: body.uid,
    name: body.name,
    email: body.email,
    gradeLevel: body.gradeLevel,
    subjects: body.subjects,
  };

  // TODO: validate data

  return student;
};

// Removes all keys with value 'undefined' from object
// Optionally pass other keys to remove
const cleanObject = (obj, disallowedKeys = []) => Object.keys(obj).reduce((acc, curr) => {
  if (curr !== 'uid' && obj[curr] !== undefined && !disallowedKeys.includes(curr)) {
    acc[curr] = obj[curr];
  }
  return acc;
}, {});

// These are the three main methods to interact with the user schemas

const getUser = async (uid) => {
  const userDoc = await getDoc('users', uid);
  let user;
  if (userDoc.role === MENTOR) {
    user = await getDoc('mentors', uid);
  } else if (userDoc.role === PARENT) {
    user = await getDoc('parents', uid);
    const studentSnapshot = await parentsCollectionRef.doc(uid).collection('students').get();
    user.students = studentSnapshot.docs.map((s) => ({ uid: s.id, ...s.data() }));
  }

  user.role = userDoc.role;
  user.uid = uid;

  return user;
};

const createUser = async (uid, body) => {
  const user = {
    role: body.role,
  };

  const batch = db.batch();
  batch.set(usersCollectionRef.doc(uid), user, { merge: true });

  if (user.role === MENTOR) {
    const mentor = await parseMentor(body);
    batch.set(mentorsCollectionRef.doc(uid), mentor);
  } else if (user.role === PARENT) {
    const parent = await parseParent(body);
    batch.set(parentsCollectionRef.doc(uid), parent);

    const validatedStudents = await Promise.all(body.students.map((s) => parseStudent(s)));
    validatedStudents.forEach((student) => {
      const newStudentRef = parentsCollectionRef.doc(uid).collection('students').doc();
      batch.set(newStudentRef, student);
    });
  } else {
    throw new Error(`Unexpected role: ${body.role}`);
  }

  return batch.commit();
};

const updateUser = async (uid, body) => {
  const user = await getUser(uid);

  if (user.role === PARENT) {
    try {
      const parentUpdate = cleanObject(await parseParent(body));
      const parent = parentsCollectionRef.doc(uid);
      await parent.set({
        ...parentUpdate,
      }, {
        merge: true,
      });

      if (body.students && body.students.length) {
        const validatedStudents = await Promise.all(body.students.map((s) => parseStudent(s)));
        const batch = db.batch();
        validatedStudents.forEach((student) => {
          const studentRef = parentsCollectionRef.doc(uid).collection('students').doc(student.uid);
          batch.set(studentRef, { ...cleanObject(student) }, { merge: true });
        });
        await batch.commit();
      }

      const updated = await parent.get();
      const updatedStudents = await parent.collection('students').get();
      const result = updated.data();
      result.students = updatedStudents.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
      result.uid = parent.id;
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  if (user.role === MENTOR) {
    try {
      const mentorUpdate = await parseMentor(body);
      const mentor = mentorsCollectionRef.doc(uid);
      await mentor.set({
        ...mentorUpdate,
      }, {
        merge: true,
      });
      const updated = await mentor.get();
      const result = updated.data();
      result.uid = mentor.id;
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  throw new Error(`Unexpected role: ${user.role}`);
};

module.exports = { getUser, createUser, updateUser };
