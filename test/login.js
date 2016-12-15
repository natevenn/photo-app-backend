let app = require('../app');
let request = require('supertest');
let assert = require('assert');
let db = app.get('db');
let jwt = require('jsonwebtoken');
let secret = process.env.SECRET;

describe('login', () => {

  beforeEach((done) => {
    db.migrate.rollback().then(() => {
      db.migrate.latest().then(() => {
        db.seed.run().then(() => {
        done();
        });
      });
    });
  });

  it('should return true if user exists', (done) => {
    let user = {
      username: 'natevenn',
      password: 'password'
    }

    request(app)
    .post('/api/v1/login')
    .send(user)
    .end( (err, res) => {
      assert.equal(res.statusCode, 200);
      done();
    });
  });
});
