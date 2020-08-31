const express = require('express');
const authMiddleware = require('../middleware/auth');
const db = require('../db/users');

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
  try {
    const user = await db.createUser(uid, req.body);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* POST a new user given the firebase token */
router.post('/', authMiddleware, async (req, res) => {
  const { uid } = req.user;

  try {
    const user = await db.createUser(uid, req.body);
    res.send(user);
  } catch (err) {
    // TODO we will want to delete the firebase auth document if there is any error
    // creating the new user.
    res.status(500).send(err);
  }
});

// router.patch('/', authMiddleware, async (req, res) => {
//   // TODO logic to update existing documents
// });

module.exports = router;
