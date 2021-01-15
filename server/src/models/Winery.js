const Sequelize = require("sequelize");
const db = require("../db");

const Winery = db.define("Winery", {
  wineryName: Sequelize.STRING,
  proprietorName: Sequelize.STRING,
  wineMakerName: Sequelize.STRING,
  phone: Sequelize.STRING(20),
  website: Sequelize.STRING,
  wineryDesc: Sequelize.TEXT,
  wineryImageFileName: Sequelize.STRING
});

module.exports = Winery;
