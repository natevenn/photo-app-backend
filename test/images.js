let app = require('../app');
let request = require('supertest');
let assert = require('assert');
let db = app.get('db');

describe('GET /images', () => {

  before((done) => {
    db.migrate.rollback().then(() => {
      db.migrate.latest().then(() => {
        db.seed.run().then(() => {
        done();
        });
      });
    });
  });

  it('should return a collection of people images for user terezavenn', (done) => {
    request(app)
    .get('/api/v1/terezavenn/people/images')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      var image = res.body[0]
      assert.deepEqual(image, {'imageUrl': 'people image'})
      done();
    })
  });

  it('should return a collection of place images for user terezavenn', (done) => {
    request(app)
    .get('/api/v1/terezavenn/places/images')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      var image = res.body[0]
      assert.deepEqual(image, {'imageUrl': 'places image'})
      done();
    })
  });
});

describe('POST /images', () => {
  before((done) => {
    db.migrate.rollback().then(() => {
      db.migrate.latest().then(() => {
        db.seed.run().then(() => {
        done();
        });
      });
    });
  });

  it('should return the image', (done) => {
    let data = {
      username: 'natevenn',
      collection: 'life',
      url: 'some url'
    }
    request(app)
    .post('/api/v1/images')
    .send(data)
    .end( (err, res) => {
      var image = res.body
      assert.deepEqual(image, {'imageUrl': 'some url'})
     done();
    });
  });

});

