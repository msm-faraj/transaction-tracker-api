module.exports = {
  // development: {
  //   username: "postgres",
  //   password: "1234",
  //   database: "postgres",
  //   host: "localhost",
  //   dialect: "postgres",
  // },
  development: {
    username: "uuldayedniweab",
    password:
      "b24a346b4fa5d23bcb36dcc8448fff71488c2c4761aba173e8a1b4c8381c8c01",
    database: "d2d3o7j3uula8l",
    host: "ec2-99-80-210-37.eu-west-1.compute.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnathorized: false,
      },
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
