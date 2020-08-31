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

// TODO: Implement node mailer.
const sendEmail = async () => { throw new Error('Not Implemented yet.'); };

export default {
  sendTextMessage, sendEmail,
};
