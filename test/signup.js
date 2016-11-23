let app = require('../app');
let request = require('supertest');
let assert = require('assert');
let db = app.get('db');
let jwt = require('jsonwebtoken');

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

    let userToken = jwt.sign({uid: 1}, 'Lipnice in the spring');

    request(app)
    .post('/api/v1/signup')
    .send(user)
    .end( (err, res) => {
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.token, userToken);

      db('users').returning('*').then( (users) => {
        assert.equal(users[0].username, user.username);
        assert.notEqual(users[0].username, user.password);
        assert(true, user.password);
      });
      done();
    });
  });
});
