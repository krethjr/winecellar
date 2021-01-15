const Sequelize = require("sequelize");
const db = require("../db");

const CellarUser = db.define("CellarUser", {
  permission: Sequelize.STRING(20)
});

module.exports = CellarUser;
