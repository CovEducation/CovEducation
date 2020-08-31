const express = require('express');
const authMiddleware = require('../middleware/auth');
const { sendEmail, sendTextMessage } = require('../messaging');
const db = require('../db/users');
const { addMessageToDB } = require('../db/users');

const router = express.Router();

const NOTIFICATION_PREFERENCES = {
  SMS: 'SMS',
  EMAIL: 'EMAIL',
};

/**
 * Wraps around the parent's message with a template written by CovEd
 * staff.
 * @param {String} mentorName mentorName
 * @param {String} parentName parentName
 * @param {String} studentName studentName
 * @param {String} message message the parent wrote.
 */
const generateSmsMessageFromTemplate = (mentorName, parentName, studentName, message) => {
  const intro = `Hello ${mentorName}, you have a mentorship request from ${parentName}. `;
  const studentInfo = `The student's name is ${studentName}. `;
  return `${intro + studentInfo} Parent's message: ${message}`;
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

  // We want to keep logs of all messages on Firestore.
  await addMessageToDB(mentorUID, parentUID, studentUID, message);

  // Default to email if preference not specify
  const mentorPreference = mentor.communicationPref || NOTIFICATION_PREFERENCES.EMAIL;
  if (mentorPreference === NOTIFICATION_PREFERENCES.EMAIL) {
    // Use nodemailer to get the message template.
    // TODO: Include HTML template.
    const emailBody = '<b>You have a request. Pls respond.</b>'; // Extract from the templates.
    sendEmail(mentor.email, emailBody).then(() => res.send({}));
  } else if (mentorPreference === NOTIFICATION_PREFERENCES.SMS) {
    // Use Twilio.
    const fullMessage = generateSmsMessageFromTemplate(message);
    sendTextMessage(mentor.phone, fullMessage).then(() => res.send({}));
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
