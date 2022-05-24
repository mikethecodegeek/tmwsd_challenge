module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "seederStorage": "sequelize"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_TEST_DATABASE,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "dialect": "postgres",
    "seederStorage": "sequelize",
    "use_env_variable": process.env.DATABASE_URL,
    "dialectOptions": {
      "ssl": {
          "require": true,
          "rejectUnauthorized": false
      }}
  }
}
