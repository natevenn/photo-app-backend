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

  it('should return status 400 if user attribute missing', (done) => {
    let user = {
      username: 'nate'
    }

    request(app)
    .post('/api/v1/login')
    .send(user)
    .end( (err, res) => {
      assert.equal(res.statusCode, 400);
      done();
    });
  });

  it('should return error message if username does not exisit', (done) => {
    let user = {
      username: 'notauser',
      password: 'password'
    }

    request(app)
    .post('/api/v1/login')
    .send(user)
    .end( (err, res) => {
      assert.equal(res.body.errorMessage, "Invalid username or password")
      done();
    });
  });

  it('should return error message if password does not match user password', (done) => {
    let user = {
      username: 'natevenn',
      password: 'differentpassword'
    }

    request(app)
    .post('/api/v1/login')
    .send(user)
    .end( (err, res) => {
      assert.equal(res.body.errorMessage, "Invalid username or password")
      done();
    });
  });


  it('should return JWT and username if user exists and authenticated', (done) => {
    let user = {
      username: 'natevenn',
      password: 'password'
    }

    let userToken = jwt.sign({uid: 2}, secret);

    request(app)
    .post('/api/v1/login')
    .send(user)
    .end( (err, res) => {
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.username, 'natevenn');
      assert.equal(res.body.token, userToken)
      done();
    });
  });
});
