const firebase = require('firebase-admin');
const Schemas = require('./schemas');
const algoliasearch = require('algoliasearch');

const ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
const ALGOLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
const ALGOLIA_INDEX_NAME = process.env.REACT_APP_ALGOLIA_INDEX_NAME;
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);
const { mentorSchema, parentSchema, studentSchema } = Schemas;

const db = firebase.firestore();
db.settings({ ignoreUndefinedProperties: true });

const usersCollectionRef = db.collection('users');
const mentorsCollectionRef = db.collection('mentors');
const parentsCollectionRef = db.collection('parents');
const messageCollectionRef = db.collection('requests');

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
    notificationPreference: body.notificationPreference
  };

  return mentorSchema.isValid(mentor).then(() => mentor);
};

const parseParent = async (body) => {
  const parent = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    pronouns: body.pronouns,
    avatar: body.avatar,
    timezone: body.timezone,
    notificationPreference: body.notificationPreference
  };

  return parentSchema.isValid(parent).then(() => parent);
};

const parseStudent = async (body) => {
  const student = {
    name: body.name,
    email: body.email,
    gradeLevel: body.gradeLevel,
    subjects: body.subjects,
  };

  return studentSchema.isValid(student).then(() => student);
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
    user.students = studentSnapshot.docs.map((s) => {
      const data = s.data();
      const id = s.id;
      return {
        id, ...data
      }
    });

  }
  user.role = userDoc.role;
  return user;
};

//Get user details using email address
const getUserByEmail = async (emailAddress) => {
  let user;
  return firebase.auth().getUserByEmail(emailAddress).then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      user = userRecord;
      return user;
  })
  .catch((error) => {
      console.log('Error fetching user data:', error);
  })

  //return user;
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
    const data = [mentor];
   index.saveObjects(data, { autoGenerateObjectIDIfNotExist: true })
      .then(({ objectIDs }) => {
        console.log('objectIDs',objectIDs);
      }).catch((error) => {
        console.log('Error fetching user data:', error);
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
      const newStudentRef = parentsCollectionRef.doc(uid).collection('students').doc();
      batch.set(newStudentRef, newStudent);
    }

  } else {
    throw new Error(`Unexpected role: ${body.role}`);
  }

  return batch.commit();
};

const addMessageToDB = async (mentorUID, parentUID, studentUID, studentName, message) => {
  if (!mentorUID) throw new Error('mentorUID not provided.');
  if (!parentUID) throw new Error('parentUID not provided.');
  if (!studentUID) throw new Error('studentUID not provided.');
  if (!message) throw new Error('message not provided.');
  const requestStatus = "Pending";
  const createdDate = new Date().toISOString();
  const sessionHours = 0;
  const sessionDate = new Date().toISOString();
  const meetingUrl = mentorUID.concat(studentUID);
  const newMessage = {
    mentorUID, parentUID, studentUID,studentName,sessionHours,requestStatus,createdDate,sessionDate, message,meetingUrl
  };
  const newMessageRef = await messageCollectionRef.add(newMessage);

    // let query = await messageCollectionRef.where('studentUID', '==', studentUID).where('mentorUID', '==', mentorUID).get();

    // if (query.empty) {
    //   console.log('No matching documents.');
    //   return;
    // }  
    // if (!query.exists) {
    //   console.log('No such document!');
    // } else {
    //   console.log('Document data:', query.data());
    // }
  
    return mentorsCollectionRef.doc(mentorUID).update({
      requests: firebase.firestore.FieldValue.arrayUnion(newMessageRef.id),
    });
};

const saveUserDetails = async (uid, data) => {
  data = JSON.parse(data);
  console.log("data", data);
  var user = await getUser(uid);
  
  if(user.role == "MENTOR")
  {
    var basicDetailsSave = mentorsCollectionRef.doc(uid).update({
      "name": data.mentorName,
      "pronouns":data.pronouns,
      "notificationPreference": data.notificationPreference,
      "major": data.major,
      "bio": data.introduction,
      "subjects": data.selectedSubjects,
      "gradeLevels": data.selectedGradeLevels
    });
    var user = await getUser(uid);
  }
  else {
    var basicDetailsSave = parentsCollectionRef.doc(uid).update({
      "name": data.parentName,
      "phone": data.parentPhoneNumber,
      "pronouns":data.parentPronouns,
      "timezone":data.timeZone,
      "notificationPreference": data.notificationPreference
    });

    if(data.registeredChildren.length > 0)
    {
      for(var i = 0; i < data.registeredChildren.length; i++)
      {
        var a = await parentsCollectionRef.doc(uid).collection('students').where("email", "==", data.registeredChildren[i].email).get()
        .then(async (querySnapshot) => {
          if(querySnapshot.docs.length > 0)
          {
            querySnapshot.docs.forEach(async (doc) => {
              console.log(doc.id);
              console.log(doc.data());
              await parentsCollectionRef.doc(uid).collection('students').doc(doc.id).update({
                "gradeLevel": data.registeredChildren[i].gradeLevel,
                "name": data.registeredChildren[i].name,
                "subjects": data.registeredChildren[i].subjects
              });
            });
          }
          else {
            await parentsCollectionRef.doc(uid).collection('students').add({
              "gradeLevel": data.registeredChildren[i].gradeLevel,
              "name": data.registeredChildren[i].name,
              "subjects": data.registeredChildren[i].subjects,
              "email": data.registeredChildren[i].email
            });
          }
        });
      }
    }
    var user = await getUser(uid);
  }
  

  return user;
};

module.exports = { getUser, createUser, addMessageToDB, getUserByEmail, saveUserDetails };
