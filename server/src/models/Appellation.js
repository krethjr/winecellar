const Sequelize = require("sequelize");
const db = require("../db");

const Appellation = db.define("Appellation", {
  appName: Sequelize.STRING,
  commonFlg: Sequelize.BOOLEAN
});

module.exports = Appellation;
