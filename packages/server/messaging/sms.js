// Utilities to send SMS messages between two users.
require('dotenv').config();

const { TWILIO_SID, TWILIO_AUTH_TOKEN, COVED_TWILIO_NUM } = process.env;
const client = require('twilio')(TWILIO_SID, TWILIO_AUTH_TOKEN);
/**
 * Sends a given message to the recipient.
 * @param {String} recipientNum - phone number of the recipient.
 * @param {String} message - text message to send.
 */
const sendTextMessage = async (recipientNum, message) => client.messages.create({
  body: message,
  from: COVED_TWILIO_NUM,
  to: recipientNum,
});

/**
 * Wraps around the parent's message with a template written by CovEd
 * staff.
 * @param {String} mentorName mentorName
 * @param {String} parentName parentName
 * @param {String} studentName studentName
 * @param {String} message message the parent wrote.
 */
const generateMentorMessage = (mentorFirstName, parentName, studentName, message) => {
  const intro = `Hello ${mentorFirstName}, you have a mentorship request from ${parentName}. `;
  const studentInfo = `The student's name is ${studentName}. `;
  return `${intro + studentInfo} Parent's message: ${message}`;
};

const textMentorRequest = async (mentor, parent, student, parentMessage) => {
  console.log("message", "message");
  const message = generateMentorMessage(mentor.name, parent.email, (student.length > 0)?student[0]:parent.name, parentMessage);
  console.log("message", message);
  return sendTextMessage(mentor.phone, message);
};

const textParentRequest = async (mentor, parent, studentName, status) => {
  const message = `Hello ${parent.name}, requested mentor ${mentor.name} have ${status} your request for student ${studentName}.`;
  return sendTextMessage(parent.phone, message);
}

const textMentorReplyRequest = async (mentor, parent, studentName, status) => {
  const message = `Hello ${mentor.name}, mantee ${parent.name} have ${status} a membership for student ${studentName}.`;
  return sendTextMessage(mentor.phone, message);
}

const textGuardianConfirmation = () => { throw new Error('Not implemented yet.'); };

const textPrivacyReminder = () => { throw new Error('Not implemented yet.'); };

module.exports = {
  textMentorRequest,
  textGuardianConfirmation,
  textPrivacyReminder,
  textParentRequest,
  textMentorReplyRequest
};
