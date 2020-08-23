const request = require('supertest');
const app = require('../../app');

const TEST_USER_ID = '8jfvgEGNXCPbSAIR3X61TsV28S42';

describe('Test User Routes', () => {
  test('/users', async () => {
    const fullPath = `/users?firebaseUID=${TEST_USER_ID}`;
    const response = await request(app).get(fullPath);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Johan Cervantes');
    expect(response.body.firebase_uid).toBe(TEST_USER_ID);
  });
});
