const Yup = require('yup');

const phoneRegex = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
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
    .required('Avatar Required'),
  bio: Yup
    .string()
    .required('Bio Required'),
  major: Yup
    .string(),
  subjects: Yup
    .array()
    .required('Subjects Required'),
  gradeLevels: Yup
    .array()
    .required('Grade Levels Required'),
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
  avatar: Yup
    .string()
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
    .required('Subjects Required'),
  gradeLevel: Yup
    .number()
    .required('Grade Level Required'),
});

module.exports = {
  mentorSchema: mentor,
  studentSchema: student,
  parentSchema: parent,
};
