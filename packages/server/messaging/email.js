import { createTransport } from 'nodemailer';
import { compile } from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';
import mandrillTransport from 'nodemailer-mandrill-transport';

require('dotenv').config();

const transactionalTransporter = createTransport(mandrillTransport({
  auth: {
    apiKey: process.env.MANDRILL_KEY,
  },
}));

// HTML Templates

const matchFilepath = join(__dirname, 'templates/match.html');
const matchSource = readFileSync(matchFilepath, 'utf-8').toString();
const matchTemplate = compile(matchSource);

const verificationFilepath = join(__dirname, 'templates/verification.html');
const verificationSource = readFileSync(verificationFilepath, 'utf-8').toString();
const verificationTemplate = compile(verificationSource);

const reminderFilepath = join(__dirname, 'templates/reminder.html');
const reminderSource = readFileSync(reminderFilepath, 'utf-8').toString();
const reminderTemplate = compile(reminderSource);

/**
 * Sends an email to a mentor based on the CovEd match template.
 * @param {string} email - Email address of the mentor
 * @param {string} mentorFirst- First name of the mentor
 * @param {string} studentEmail Email of the mentee
 * @param {string} message Personalized messsage from the mentee to mentor
 */
async function emailMentorRequest(mentor, parent, student, message) {
  const replacements = {
    mentorfirst: mentor.name,
    parentname: parent.name,
    parentemail: parent.email,
    studentname: student.name,
    message,
  };
  const htmlToSend = matchTemplate(replacements);
  const mailOptions = {
    from: 'CovEd <coved@coved.org>',
    to: mentor.email,
    subject: 'CovEd Match!',
    html: htmlToSend,
  };
  await transactionalTransporter.sendMail(mailOptions);
}

/**
 * Sends an email to the parent verifying their mentor request.
 * @param {string} guardianName - Name of the guardian
 * @param {string} guardianEmail - Email address of the guardian
 */
async function emailGuardianConfirmation(mentor, parent, student) {
  const replacements = {
    parentname: parent.name,
    mentorname: mentor.name,
    studentname: student.name,
  };
  const htmlToSend = verificationTemplate(replacements);
  const mailOptions = {
    from: 'CovEd <coved@coved.org>',
    to: parent.email,
    subject: 'CovEd Mentor Request',
    html: htmlToSend,
  };
  await transactionalTransporter.sendMail(mailOptions);
}

/**
 * Sends a reminder email to users which have verified their email.
 * @param {string} userEmail
 */
async function sendPrivacyReminderEmail(userEmail) {
  const htmlToSend = reminderTemplate({});
  const mailOptions = {
    from: 'CovEd <coved@coved.org>',
    to: userEmail,
    subject: 'Thank you for signing up with CovEd!',
    html: htmlToSend,
  };
  await transactionalTransporter.sendMail(mailOptions);
}

export default {
  emailMentorRequest,
  emailGuardianConfirmation,
  sendPrivacyReminderEmail,
};
