const { studentSchema } = require('../../db/schemas');

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
