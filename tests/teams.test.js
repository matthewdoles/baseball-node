const request = require('supertest');
const app = require('../src/app');

describe('Test defeault teams route', () => {
  const ENV = process.env;

  beforeEach(() => {
    process.env = { ...ENV };
  });

  afterAll(() => {
    process.env = ENV;
  });

  test('It should GET all teams', async () => {
    process.env.NODE_ENV = 'production';
    const response = await request(app).get('/teams');
    expect(response.statusCode).toBe(200);
    expect(response.body.teams[0].name).toBe('Aberdeen IronBirds');
  }, 10000);

  test('It should fail to GET all teams', async () => {
    process.env.TEST_TABLE = 'invalid';
    const response = await request(app).get('/teams');
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe(
      'Cannot retrieve teams, please try again.'
    );
  }, 10000);
});
