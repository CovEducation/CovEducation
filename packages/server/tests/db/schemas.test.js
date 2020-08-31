const { studentSchema } = require('../../db/schemas');
const { parentSchema } = require('../../db/schemas');
const { mentorSchema } = require('../../db/schemas');

describe('Test Student Data Validation', () => {
  test('wellformedStudent', async () => {
    const wellformedStudent = {
      name: 'Jack',
      subjects: ['Math', 'Science', 'STEM'],
      gradeLevel: 9,
    };
    expect(studentSchema.isValidSync(wellformedStudent)).toBeTruthy();
  });

  test('malformedStudent', async () => {
    const malformedStudent = {
      name: 'Billy',
      subjects: undefined,
      gradeLevel: undefined,
    };
    expect(studentSchema.isValidSync(malformedStudent)).toBeFalsy();
  });

  test('malformedTypes', async () => {
    const malformedStudent = {
      name: 'Tom',
      subjects: true,
      gradeLevel: '9',
      email: 192,
    };
    expect(studentSchema.isValidSync(malformedStudent)).toBeFalsy();
  });

  test('allFieldFilled', async () => {
    const student = {
      name: 'Tommy Two Shoes',
      subjects: ['Math', 'Science'],
      gradeLevel: 9,
      email: 'test@student.com',
    };
    expect(studentSchema.isValidSync(student)).toBeTruthy();
  });
});

describe('Test Parent Data Validation', () => {
  test('wellformedParent', async () => {
    const wellformedParent = {
      email: 'jack@gmail.com',
      name: 'Jack',
      timezone: 'UTC',
      pronouns: 'he/him',
      avatar: 'https://cdn.pixabay.com/photo/2017/11/30/15/26/landscape-2988663_960_720.jpg',
    };
    expect(parentSchema.isValidSync(wellformedParent)).toBeTruthy();
  });

  test('malformedParent', async () => {
    const malformedParent = {
      email: 'jack.com',
      name: 'Jack',
      timezone: 'UTC',
      pronouns: 'he/him',
      // TODO: Check if string is a link to a valid image
      avatar: 'https://www.google.com',
    };
    expect(parentSchema.isValidSync(malformedParent)).toBeFalsy();
  });

  test('malformedTypes', async () => {
    const malformedParent = {
      email: true,
      name: 'Jack',
      timezone: 56,
      phone: 'no phone',
      pronouns: 'he/him',
      avatar: 'hi',
    };
    expect(parentSchema.isValidSync(malformedParent)).toBeFalsy();
  });

  test('allFieldFilled', async () => {
    const parent = {
      email: 'jack@gmail.com',
      name: 'Jack',
      timezone: 'UTC',
      phone: '1234567890',
      pronouns: 'he/him',
      avatar: 'https://cdn.pixabay.com/photo/2017/11/30/15/26/landscape-2988663_960_720.jpg',
    };
    expect(parentSchema.isValidSync(parent)).toBeTruthy();
  });
});

describe('Test Mentor Data Validation', () => {
  test('wellformedMentor', async () => {
    const wellformedMentor = {
      email: 'emily@gmail.com',
      name: 'Emily',
      timezone: 'UTC',
      phone: '1234567890',
      avatar: 'https://cdn.pixabay.com/photo/2017/11/30/15/26/landscape-2988663_960_720.jpg',
      bio: 'Hi! I am very cool. :)',
      subjects: ['History', 'Psychology', 'AP French'],
      gradeLevels: ['Elementary', 'High'],
    };
    expect(mentorSchema.isValidSync(wellformedMentor)).toBeTruthy();
  });

  test('malformedMentor', async () => {
    const malformedMentor = {
      email: 1,
      timezone: 'PTSD',
      phone: '5654549898',
      // TODO: Check if string is a link to a valid image
      avatar: 'https://www.google.com',
      bio: 'Hi! I am not cool. :(',
      subjects: ['History', 'Psychology', 'AP French'],
      gradeLevels: [],
    };
    expect(studentSchema.isValidSync(malformedMentor)).toBeFalsy();
  });

  test('malformedTypes', async () => {
    const malformedMentor = {
      email: 'uno',
      name: 2,
      timezone: 'PTSD',
      phone: '565656',
      avatar: true,
      bio: 'Hi! I am very cool. :)',
      subjects: ['History', 'Psychology', 'AP French'],
      gradeLevels: ['Elementary', 'High'],
    };
    expect(studentSchema.isValidSync(malformedMentor)).toBeFalsy();
  });

  test('allFieldFilled', async () => {
    const mentor = {
      email: 'emily@gmail.com',
      name: 'Emily',
      timezone: 'UTC',
      phone: '1234567890',
      pronouns: 'she/her',
      college: 'Harvard Class of 2050',
      avatar: 'https://cdn.pixabay.com/photo/2017/11/30/15/26/landscape-2988663_960_720.jpg',
      bio: 'Hi! I am very cool. :)',
      major: 'Linguistics',
      subjects: ['History', 'Psychology', 'AP French'],
      gradeLevels: ['Elementary', 'High'],
    };
    expect(mentorSchema.isValidSync(mentor)).toBeTruthy();
  });
});
