const firebase = require("firebase-admin");
const { mentorSchema, parentSchema, studentSchema } = require("./schemas");

const db = firebase.firestore();
db.settings({ ignoreUndefinedProperties: true });

const usersCollectionRef = db.collection("users");
const mentorsCollectionRef = db.collection("mentors");
const parentsCollectionRef = db.collection("parents");
const messageCollectionRef = db.collection("requests");

const MENTOR = "MENTOR";
const PARENT = "PARENT";

const getDoc = async (collection, uid) => {
  const obj = await db.collection(collection).doc(uid).get();
  if (obj.exists) {
    return obj.data();
  }
  throw new Error(`Unable to find '${uid}' in '${collection}' collection`);
};

// Validation Functions
const parseMentor = async (mentorData) => {
  const mentor = {
    ...mentorData,
  };

  return mentorSchema.isValid(mentor).then(() => mentor);
};

const parseParent = async (parentData) => {
  const parent = {
    ...parentData,
  };

  return parentSchema.isValid(parent).then(() => parent);
};

const parseStudent = async (studentData) => {
  const student = {
    ...studentData,
  };
  return studentSchema.isValid(student).then(() => student);
};

// These are the three main methods to interact with the user schemas
const getUser = async (uid) => {
  const userDoc = await getDoc("users", uid);
  if (userDoc.role !== MENTOR && userDoc.role !== PARENT) {
    throw new Error(`Incorrect user role: ${user.role.role}`);
  }
  let user = { role: userDoc.role };
  if (userDoc.role === MENTOR) {
    user = await getDoc("mentors", uid);
  } else if (userDoc.role === PARENT) {
    user = await getDoc("parents", uid);
    const studentSnapshot = await parentsCollectionRef
      .doc(uid)
      .collection("students")
      .get();
    user.students = studentSnapshot.docs.map((s) => s.data());
  }
  return user;
};

const getUserByEmail = async (emailAddress) => {
  return firebase
    .auth()
    .getUserByEmail(emailAddress)
    .catch((error) => {
      console.log("Error fetching user data:", error);
    });
};

const createUser = async (uid, body) => {
  const user = {
    role: body.role,
  };

  const batch = db.batch();
  batch.set(usersCollectionRef.doc(uid), user);

  if (user.role === MENTOR) {
    const mentor = await parseMentor(body).catch((err) => {
      throw new Error(`Unable to parse mentor: ${err}`);
    });
    batch.set(mentorsCollectionRef.doc(uid), mentor);
  } else if (user.role === PARENT) {
    const parent = await parseParent(body).catch((err) => {
      throw new Error(`Unable to parse parent: ${err}`);
    });
    batch.set(parentsCollectionRef.doc(uid), parent);

    for (student of body.students) {
      const newStudent = await parseStudent(student).catch((err) => {
        throw new Error(`Unable to parse student: ${err}`);
      });
      const newStudentRef = parentsCollectionRef
        .doc(uid)
        .collection("students")
        .doc();
      batch.set(newStudentRef, newStudent);
    }
  } else {
    throw new Error(`Unexpected role: ${body.role}`);
  }

  return batch.commit();
};

const addMessageToDB = async (mentorUID, parentUID, students, message) => {
  console.log("in addMessageToDB");
  if (!mentorUID) throw new Error("mentorUID not provided.");
  if (!parentUID) throw new Error("parentUID not provided.");
  if (!message) throw new Error("message not provided.");
  const requestStatus = "Pending";
  const createdDate = new Date();
  const sessionHours = 0;
  const sessionDate = new Date();
  const newMessage = {
    mentorUID,
    parentUID,
    students,
    message,
  };
  const newMessageRef = await messageCollectionRef.add(newMessage);
  return mentorsCollectionRef.doc(mentorUID).update({
    requests: firebase.firestore.FieldValue.arrayUnion(newMessageRef.id),
  });
};

module.exports = { getUser, createUser, addMessageToDB, getUserByEmail };
