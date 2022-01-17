module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
  production: {
    dialect: 'postgres',
    seederStorage: 'sequelize',
    use_env_variable: 'DATABASE_URL',
  }
};
