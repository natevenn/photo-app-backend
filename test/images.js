let app = require('../app');
let request = require('supertest');
let assert = require('assert');
let db = app.get('db');
let jwt = require('jsonwebtoken')
let secret = process.env.SECRET

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
      let image = res.body[0].imageUrl
      assert.deepEqual(image, 'people image')
      done();
    })
  });

  it('should return a collection of place images for user terezavenn', (done) => {
    request(app)
    .get('/api/v1/terezavenn/places/images')
    .expect('Content-Type', /json/)
    .expect(200)
    .end( (err, res) => {
      let image = res.body[0].imageUrl
      assert.deepEqual(image, 'places image')
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
    let token = jwt.sign({uid: 1} , secret);
    let data = {
      username: 'natevenn',
      collection: 'life',
      url: 'some url',
      token: token
    }

    request(app)
    .post('/api/v1/images')
    .send(data)
    .end( (err, res) => {
      let image = res.body.imageUrl
      assert.deepEqual(image, 'some url')
     done();
    });
  });
});

describe('DELETE /images/:id', () => {
  before((done) => {
    db.migrate.rollback().then(() => {
      db.migrate.latest().then(() => {
        db.seed.run().then(() => {
        done();
        });
      });
    });
  });

  it('should delete image from image table', (done) => {
    let token = jwt.sign({uid: 1}, secret);

    request(app)
    .del('/api/v1/images/1')
    .end( (err, res) => {
      assert.deepEqual(res.body, 'Image id 1 was deleted')
      done();
    });
  });
});

