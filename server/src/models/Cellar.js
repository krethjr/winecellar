const Sequelize = require("sequelize");
const db = require("../db");

const Cellar = db.define("Cellar", {
  cellarName: Sequelize.STRING
});

module.exports = Cellar;
