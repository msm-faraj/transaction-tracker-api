require("dotenv").config();

module.exports = {
  development: {
    dialect: "postgres",
    host: process.env.DEV_DB_HOST,
    database: process.env.DEV_DB_DATABASE,
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
  },
  test: {
    dialect: "postgres",
    host: process.env.TEST_DB_HOST,
    database: process.env.TEST_DB_DATABASE,
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
  },
  production: {
    dialect: "postgres",
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
