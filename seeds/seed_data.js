exports.seed = (knex, Promise) => {
  return Promise.join(
    knex('users').del(),
    knex('collections').del(),
    knex('images').del(),

    knex('users').insert(
      {
        id: 1,
        username: 'Tereza Venn',
        password: '$2a$10$bP2LsoRB4r8kSaczW75jjunetKSZNHUXsHCD6qA0/FeKMYztTnVfe'
      }
    ),

    knex('collections').insert(
      [
        {
          id: 1,
          name: 'people'
        },
        {
          id: 2,
          name: 'places'
        },
        {
          id: 3,
          name: 'life'
        },
        {
          id: 4,
          name: 'art'
        },
        {
          id: 5,
          name: 'crested butte'
        }
      ]
    )
  )
};
