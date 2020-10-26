const {
  textMentorRequest,
  textGuardianConfirmation,
  textPrivacyReminder,
} = require('./sms');
const {
  emailMentorRequest,
  emailGuardianConfirmation,
  emailPrivacyReminder,
  emailSignUpVerification,
} = require('./email');

module.exports = {
  textMentorRequest,
  textGuardianConfirmation,
  textPrivacyReminder,
  emailMentorRequest,
  emailGuardianConfirmation,
  emailPrivacyReminder,
  emailSignUpVerification,
};
