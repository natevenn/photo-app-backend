let app = require('../app');
let request = require('supertest');
let assert = require('assert');
let db = app.get('db');

describe('signin', () => {

  beforeEach((done) => {
    db.migrate.rollback().then(() => {
      db.migrate.latest().then(() => {
        done();
      });
    });
  });

  it('should return status 400 if user attribute missing', (done) => {
    let user = {
      username: 'nate'
    }

    request(app)
    .post('/api/v1/signup')
    .send(user)
    .end( (err, res) => {
      assert.equal(res.statusCode, 400);
      done();
    });
  });

  it('should not create duplicate users', (done) => {
    let user = {
      username: 'nate',
      password: 'password'
    }

    db('users').insert(user).then( function() {
      request(app)
      .post('/api/v1/signup')
      .send(user)
      .end( (err, res) => {
        assert.equal(res.body.errorMessage, 'Username already exists');
        done();
      });
    });
  });

  it('should create user', (done) => {
    let user = {
      username: 'nate',
      password: 'password'
    }

    request(app)
    .post('/api/v1/signup')
    .send(user)
    .end( (err, res) => {
      assert.equal(res.statusCode, 200);

      db('users').returning('*').then( (users) => {
        assert.equal(users[0].username, user.username);
        assert.equal(users[0].password, user.password);
      });
      done();
    });
  });
});
