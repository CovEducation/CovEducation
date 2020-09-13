const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const mandrillTransport = require('nodemailer-mandrill-transport');

require('dotenv').config();
const transactionalTransporter = nodemailer.createTransport(mandrillTransport({
  auth: {
    apiKey: process.env.MANDRILL_KEY,
  },
}));

// HTML Templates

const matchFilepath = path.join(__dirname, 'templates/match.html');
const matchSource = fs.readFileSync(matchFilepath, 'utf-8').toString();
const matchTemplate = handlebars.compile(matchSource);

const verificationFilepath = path.join(__dirname, 'templates/verification.html');
const verificationSource = fs.readFileSync(verificationFilepath, 'utf-8').toString();
const verificationTemplate = handlebars.compile(verificationSource);

const reminderFilepath = path.join(__dirname, 'templates/reminder.html');
const reminderSource = fs.readFileSync(reminderFilepath, 'utf-8').toString();
const reminderTemplate = handlebars.compile(reminderSource);

const signUpVerificationMentorPath = path.join(__dirname, 'templates/signUpVerificationMentor.html');
const signUpVerificationMentorSource = fs.readFileSync(signUpVerificationMentorPath, 'utf-8').toString();
const signUpVerificationMentorTemplate = handlebars.compile(signUpVerificationMentorSource);

const signUpVerificationParentPath = path.join(__dirname, 'templates/signUpVerificationParent.html');
const signUpVerificationParentSource = fs.readFileSync(signUpVerificationParentPath, 'utf-8').toString();
const signUpVerificationParentTemplate = handlebars.compile(signUpVerificationParentSource);

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

/**
 * Sends a email verification email after sign up.
 * @param {Object} user A Mentor or Parent object.
 */
async function emailSignUpVerification(user) {
  if (user.role !== 'MENTOR' && user.role !== 'PARENT') {
    throw new Error(`Invalid user role, cannot send verification email: ${user.role}`);
  }
  if (user.email === undefined || user.email === null) {
    throw new Error('User does not have an email, annot send verification email.');
  }
  const htmlToSend = user.role === 'MENTOR' ? signUpVerificationMentorTemplate({ name: user.name })
    : signUpVerificationParentTemplate({ name: user.name });
  const mailOptions = {
    from: 'CovEd <coved@coved.org>',
    to: user.email,
    subject: 'Welcome to CovEd! [ACTION REQUIRED]',
    html: htmlToSend,
  };
  await transactionalTransporter.sendMail(mailOptions);
}

module.exports = {
  emailMentorRequest,
  emailGuardianConfirmation,
  sendPrivacyReminderEmail,
  emailSignUpVerification,
};
