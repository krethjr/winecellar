const Sequelize = require("sequelize");
const db = require("../db");

const CellarWine = db.define("CellarWine", {
  wineName: Sequelize.STRING,
  wineDesc: Sequelize.TEXT,
  rating: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
  cost: Sequelize.DECIMAL(10, 2)
});

module.exports = CellarWine;
