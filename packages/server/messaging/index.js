const {
  textMentorRequest,
  textGuardianConfirmation,
  textPrivacyReminder,
} = require('./sms');
const {
  emailMentorRequest,
  emailGuardianConfirmation,
  sendPrivacyReminderEmail,
} = require('./email');

export default {
  textMentorRequest,
  textGuardianConfirmation,
  textPrivacyReminder,
  emailMentorRequest,
  emailGuardianConfirmation,
  sendPrivacyReminderEmail,
};
