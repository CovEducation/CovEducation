const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  textMentorRequest,
  textGuardianConfirmation,
  emailMentorRequest,
  emailGuardianConfirmation,
} = require('../messaging');
const db = require('../db/users');
const { addMessageToDB } = require('../db/users');

const router = express.Router();

const NOTIFICATION_PREFERENCES = {
  SMS: 'SMS',
  EMAIL: 'EMAIL',
};

/**
 * Sends a mentorship request to the mentor through the mentor's
 * preferred communication method.
 * Defaults to email if the mentor did not specify a preference.
 * Arguments:
 *  mentorUID - The FirebaseUID of the mentor the parent is requesting.
 *  studentUID - The FirebaseUID of the student who needs mentorship.
 *  message - The message the parent wants to send the mentor.
 */
router.post('/requestMentor', authMiddleware, async (req, res) => {
  // Get the mentor's preference.
  const { mentorUID, studentUID, message } = req.body;
  const parentUID = req.user.uid;

  const mentor = await db.getUser(mentorUID);
  const parent = await db.getUser(parentUID);
  const student = await db.getUser(studentUID);

  // We want to keep logs of all messages on Firestore.
  await addMessageToDB(mentorUID, parentUID, studentUID, message);

  // Default to email if preference not specify
  const mentorPreference = mentor.communicationPref || NOTIFICATION_PREFERENCES.EMAIL;
  if (mentorPreference === NOTIFICATION_PREFERENCES.EMAIL) {
    emailMentorRequest(mentor, parent, student, message)
      .then(emailGuardianConfirmation(mentor, parent, student))
      .then(() => res.send({}));
  } else if (mentorPreference === NOTIFICATION_PREFERENCES.SMS) {
    // Use Twilio.
    textMentorRequest(mentor, parent, student, message)
      .then(textGuardianConfirmation(mentor, parent, student))
      .then(() => res.send({}));
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
