const Sequelize = require("sequelize");
const db = require("../db");

const Wine = db.define("Wine", {
  wineName: Sequelize.STRING,
  wineYear: Sequelize.STRING(4),
  bottleSize: Sequelize.STRING(30),
  upcBarcode: Sequelize.STRING(16),
  wineDesc: Sequelize.TEXT,
  wineImageFileName: Sequelize.STRING,
  overallRating: Sequelize.INTEGER
});

module.exports = Wine;
