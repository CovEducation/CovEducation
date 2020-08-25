const request = require('supertest');
const firebase = require('firebase-admin');
const app = require('../../app');

describe('Test User Routes', () => {
  test('/users', async () => {
    firebase.auth().verifyIdToken.mockImplementation(() => {
      throw 'Some user not found error'
    });
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(403);
    expect(response.text).toBe('Error authenticated API request: Some user not found error');
  });
});
