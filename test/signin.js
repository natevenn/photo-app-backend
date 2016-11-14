let app = require('../app');
let chai = require('chai');
let request = require('supertest')
let should = chai.should();
request = request('http://localhost:3000')

describe('signin', () => {
  beforeEach((done) => {
    let db = app.get('db');
    app.set('db', db);
    //console.log('db', db('users'));
    db('users').del();
    done();
  });

  describe('/POST user', () => {
    it('should post user', (done) => {
      let user = {
        username: 'nate',
        password: 'password'
      }
      request
      .post('/api/v1/signup')
      .send(user)
      .end( (err, res) => {
        res.should.have.status(200);
      });
    });
  });
});
