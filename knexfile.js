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
    client: 'postgresql',
    connection: 'postgres://localhost/photo_development',
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    }
  }

};
