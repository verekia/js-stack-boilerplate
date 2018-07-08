exports.seed = async knex => {
  const DEMO_USER_ID = 'cda53ee4-3de7-430c-80bd-7539e724b238'
  await knex('User').del()
  await knex('User').insert({
    id: DEMO_USER_ID,
    username: 'local',
    passwordHash: '$2b$12$G9OyR3bVcUDSgrUuRMORuOOY/SpgbCyWyRIw0CIhnU1hkhi2jTI6C',
  })

  await knex('Note').del()
  await knex('Note').insert([
    {
      id: '491f6605-d01b-44da-8fdf-1a34f52e5378',
      userId: DEMO_USER_ID,
      title: 'Hello World',
    },
    {
      id: 'ede4daf5-354f-426f-8ceb-f89284eb585c',
      userId: DEMO_USER_ID,
      title: 'Hi Universe',
      description: "Let's conquer space!",
    },
  ])
}
