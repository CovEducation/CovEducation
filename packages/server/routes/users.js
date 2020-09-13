const express = require('express');
const authMiddleware = require('../middleware/auth');
const db = require('../db/users');
const { emailSignUpVerification } = require('../messaging');

const router = express.Router();

/**
 * Gets a user to the database.
 * Arguments:
 *  user (object) - Contains a uid field with the FirebaseUID of the user to retrieve..
 */
router.get('/', authMiddleware, async (req, res) => {
  const { uid } = req.user;
  try {
    const user = await db.getUser(uid);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * Adds a new user to the database.
 * Arguments:
 *  user (object) -
 *   Contains a uid field with the FirebaseUID of the user to create.
 *  body (object) -
 *   Contains all the fields of the user to create based on the designated schema.
 */
router.post('/', authMiddleware, async (req, res) => {
  const { uid } = req.user;
  console.log(req.body);
  try {
    const user = await db.createUser(uid, req.body);
    // Send an email to verify their email and other
    // welcome messages.
    await emailSignUpVerification(req.body);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
