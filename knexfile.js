// Update with your config settings.

module.exports = {

  test: {
    client: 'pg',
    connection: 'postgres://localhost/photo_test',
    pool: {
      min: 2,
      max: 10
    }
  },

  development: {
    client: 'pg',
    connection: 'postgres://localhost/photo_development',
    pool: {
      min: 2,
      max: 10
    }
  }
};
