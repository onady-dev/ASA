const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.NODE_ENV === "test" ? "./db.sqlite.test" : "./db.sqlite",
  logging: false,
});

const User = sequelize.define("User", {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
});

module.exports = { Sequelize, sequelize, User };
