const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.REMOTE_USERNAME,
    password: process.env.REMOTE_PASSWORD,
    database: process.env.REMOTE_DATABASE,
    host: process.env.REMOTE_HOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.REMOTE_USERNAME,
    password: process.env.REMOTE_PASSWORD,
    database: process.env.REMOTE_DATABASE,
    host: process.env.REMOTE_HOST,
    dialect: "mysql",
  },
};



// username: "root",
//     password: null,
//     database: "trendboost",
//     host: "127.0.0.1",
//     dialect: "mysql",