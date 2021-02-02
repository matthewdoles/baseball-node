const request = require('supertest');
const app = require('../src/app');

describe('Test invalid route', () => {
  test('It should fail to GET data', async () => {
    const response = await request(app).get('/teams/invalid');
    expect(response.body.message).toBe('Could not find this route.');
    expect(response.statusCode).toBe(404);
  }, 10000);
});
