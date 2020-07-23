// Endpoints to get the logged in parent or mentor.
// TODO(johancc) - Make sure the firebase uid is stored in
// the collection entry.
// TODO(johancc) - Add a schema to Firestore.

const express = require('express');

const router = express.Router();

// Firebase boilerplate.
const admin = require('firebase-admin');

const db = admin.firestore();

const parentRef = db.collection('parents');

const mentorRef = db.collection('mentors');

const userRef = db.collection('users'); // Mapping of Firebase UID -> Type of user (MENTOR / PARENT).

const getUser = (firebaseUid) => userRef.where('firebase_uid', '==', firebaseUid).limit(1).get();

const postUser = (user) => userRef.add(user);

const getParent = (firebaseUid) => parentRef.where('firebase_uid', '==', firebaseUid).limit(1).get();

const postParent = (parent) => parentRef.add(parent);

const getMentor = (firebaseUid) => mentorRef.where('firebase_uid', '==', firebaseUid).limit(1).get();

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
        postMentor({ firebase_uid: firebaseUID, ...userData })
          .then((parent) => res.send(parent))
          .catch((err) => res.sendStatus(400).json(err));
      }
    })
    .catch((err) => {
      res.sendStatus(400).json(err);
    });
});

/**
 * Gets a mentor based on firebase UID.
 */
router.get('/parent', (req, res) => {
  const { firebaseUid } = req.query;
  getParent(firebaseUid)
    .then((parent) => res.send(parent))
    .catch((err) => res.sendStatus(500).json(err));
});

/**
 * Gets a mentor based on Firebase UID
 */
router.get('/mentor', (req, res) => {
  const { firebaseUid } = req.query;
  getMentor(firebaseUid)
    .then((mentor) => res.send(mentor))
    .catch((err) => res.sendStatus(500).json(err));
});

/**
 * Adds a new parent to the parent collection.
 * Arguments:
 *    parent (object) - Contains all the fields of the new parent.
 */
router.post('/parent', (req, res) => {
  const { parent } = req.body;
  postParent(parent)
    .then((resp) => res.send(resp))
    .catch((err) => res.sendStatus(500).json(err));
});

/**
 * Adds a new mentor to the mentor collection.
 * Arguments:
 *    mentor (object) - Contains all the fields of the new mentor.
 */
router.post('/mentor', (req, res) => {
  const { mentor } = req.body.mentor;
  postMentor(mentor)
    .then((resp) => res.send(resp))
    .catch((err) => res.sendStatus(500).json(err));
});

module.exports = router;
