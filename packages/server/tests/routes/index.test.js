const request = require('supertest');
const app = require('../../app');

jest.mock('firebase-admin');

describe('Test Index Routes', () => {
  test('/heartbeat', async () => {
    const response = await request(app).get('/heartbeat');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('coved api is working');
  });
});
