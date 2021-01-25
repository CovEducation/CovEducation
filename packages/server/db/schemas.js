const Yup = require('yup');

const phoneRegex = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
);
const urlRegex = RegExp(
  /(https?:\/\/.*\.(?:png|jpg|jpeg|svg))/i,
);

const mentor = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required('Email Required'),
  name: Yup
    .string()
    .required('Name Required'),
  timezone: Yup
    .string()
    .required('Timezone Required'),
  phone: Yup
    .string()
    .matches(phoneRegex, 'Phone number is not valid'),
  pronouns: Yup
    .string(),
  college: Yup
    .string(),
  avatar: Yup
    .string()
    .matches(
      urlRegex,
      'Enter correct url!',
    )
    .required('Avatar Required'),
  bio: Yup
    .string()
    .required('Bio Required'),
  major: Yup
    .string(),
  subjects: Yup
    .array()
    .of(Yup.string())
    .min(1)
    .required('Valid Subjects Required'),
  gradeLevels: Yup
    .array()
    .of(Yup.string())
    .min(1)
    .required('Valid Grade Levels Required'),
});
const parent = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required('Email Required'),
  name: Yup
    .string()
    .required('Name Required'),
  timezone: Yup
    .string()
    .required('Timezone Required'),
  phone: Yup
    .string()
    .matches(phoneRegex, 'Phone number is not valid'),
  pronouns: Yup
    .string(),
  notificationPreference: Yup
    .string(),
  avatar: Yup
    .string()
    .matches(
      urlRegex,
      'Enter correct url!',
    )
    .required('Avatar Required'),
});
const student = Yup.object().shape({
  email: Yup
    .string()
    .email(),
  name: Yup
    .string()
    .required('Name Required'),
  subjects: Yup
    .array()
    .of(Yup.string())
    .min(1)
    .required('Valid Subjects Required'),
  gradeLevel: Yup
    .string()
    .required('Grade Level Required'),
});

module.exports = {
  mentorSchema: mentor,
  parentSchema: parent,
  studentSchema: student,
};
