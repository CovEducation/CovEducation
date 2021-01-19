const {
  textMentorRequest,
  textGuardianConfirmation,
  textPrivacyReminder,
  textParentRequest,
  textMentorReplyRequest
} = require('./sms');
const {
  emailMentorRequest,
  emailGuardianConfirmation,
  emailPrivacyReminder,
  emailSignUpVerification,
  sentParentARequestReplyEmail,
  sentMentorARequestReplyEmail
} = require('./email');

module.exports =  {
  textMentorRequest,
  textGuardianConfirmation,
  textPrivacyReminder,
  emailMentorRequest,
  emailGuardianConfirmation,
  emailPrivacyReminder,
  emailSignUpVerification,
  sentParentARequestReplyEmail,
  sentMentorARequestReplyEmail,
  textParentRequest,
  textMentorReplyRequest
};
