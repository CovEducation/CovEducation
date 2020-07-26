// Endpoints to get the logged in parent or mentor.
// TODO(johancc) - Make sure the firebase uid is stored in
// the collection entry.
// TODO(johancc) - Add a schema to Firestore.

const express = require('express');

const router = express.Router();

// Firebase boilerplate.
const admin = require('firebase-admin');

const db = admin.firestore();

const parentRef = db.collection('parents'); // Mapping of firebase_uid -> mentor.

const mentorRef = db.collection('mentors'); // Mapping of firebase_uid -> mentor.

const userRef = db.collection('users'); // Mapping of Firebase UID -> Type of user (MENTOR / PARENT).

const getDataOrUndefined = (resp, limit) => {
  if (resp.empty) return undefined;
  const wantedDocs = resp.docs.slice(0, limit);
  const resolvedDocs = wantedDocs.map((doc) => doc.data());
  return resolvedDocs;
};

const getFirstDoc = (docs) => {
  if (docs === undefined) return undefined;
  return docs[0];
};

const getUser = (firebaseUid) => userRef.where('firebase_uid', '==', firebaseUid).limit(1).get()
  .then((resp) => getDataOrUndefined(resp, 1))
  .then((docs) => getFirstDoc(docs));

const getParent = (firebaseUid) => parentRef.where('firebase_uid', '==', firebaseUid).limit(1).get()
  .then((resp) => getDataOrUndefined(resp, 1))
  .then((docs) => getFirstDoc(docs));

const getMentor = (firebaseUid) => mentorRef.where('firebase_uid', '==', firebaseUid).limit(1).get()
  .then((resp) => getDataOrUndefined(resp, 1))
  .then((docs) => getFirstDoc(docs));

const postParent = (parent) => parentRef.add(parent);

const postUser = (user) => userRef.add(user);

const postMentor = (mentor) => mentorRef.add(mentor);

/**
 * Gets a user based on firebase UID.
 */
router.get('/', (req, res) => {
  const { firebaseUID } = req.query;
  if (firebaseUID === undefined) {
    res.sendStatus(400);
    return;
  }
  getUser(firebaseUID)
    .then((user) => {
      if (user.role === 'MENTOR') {
        getMentor(firebaseUID)
          .then((mentor) => res.send(mentor))
          .catch((err) => res.sendStatus(500).json(err));
      } else if (user.role === 'PARENT') {
        getParent(firebaseUID)
          .then((parent) => res.send(parent))
          .catch((err) => res.sendStatus(500).json(err));
      }
    })
    .catch(() => {
      // Could not find the user in our database.
      res.sendStatus(500);
    });
});

/**
 * Gets a user based on firebase UID.
 */
router.post('/', (req, res) => {
  const { firebaseUID, role } = req.query;
  const { userData } = req.query;
  postUser({ firebase_uid: firebaseUID, role })
    .then((user) => {
      if (user.role === 'MENTOR') {
        postMentor({ firebase_uid: firebaseUID, ...userData })
          .then((mentor) => res.send(mentor))
          .catch((err) => res.sendStatus(400).json(err));
      } else if (user.role === 'PARENT') {
        postParent({ firebase_uid: firebaseUID, ...userData })
          .then((parent) => res.send(parent))
          .catch((err) => res.sendStatus(400).json(err));
      }
    })
    .catch((err) => {
      res.sendStatus(400).json(err);
    });
});

module.exports = router;
