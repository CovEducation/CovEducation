const express = require('express');

const router = express.Router();

const firebase = require('firebase-admin');
const db = firebase.firestore();

const userCollectionRef = db.collection('users');
const mentorCollectionRef = db.collection('mentors');
const parentColectionRef = db.collection('parents');

const authMiddleware = require('../middleware/auth');

const getDoc = async (collection, uid) => {
  const obj = await db.collection(collection).doc(uid).get();

  if (obj.exists) {
    return obj.data();
  }

  throw (`Unable to find '${uid}' in '${collection}' collection`)
}

/* GET users listing. */
router.get('/', authMiddleware, async (req, res) => {
  const uid = req.user.uid;

  try {
    const userObj = await getDoc('users', uid);
    role = userObj.role;

    if (role === 'MENTOR') {
      mentorObj = await getDoc('mentors', uid);
      res.send(mentorObj);
    } else {
      res.send('unexpected user type');
    }

  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
