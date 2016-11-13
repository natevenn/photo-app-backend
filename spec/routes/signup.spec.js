let request = require('request');
let app = require('../../app.js');

process.env.NODE_ENV = 'test';

describe('api/v1/signin', function() {

  beforeEach( (done) => {
    var db = app.get('db');
    db.migrate.latest().then(function() {
      console.log('migrations finished');
      done();
    });
    app.set('db', db);
  });

  afterEach( () => {
    var db = app.get('db');
    db('users').del();
  });

  it('returns a status 200', function(done) {
    var options = {
      uri: 'http://localhost:3000/api/v1/signup',
      json: {
        username: 'tereza venn',
        password: 'password'
      }
    }

    request.post(options, function(err, res, body) {
      expect(res).toNotBe(undefined);
      expect(res.statusCode).toBe(200);
      done();
    });
  })
});
