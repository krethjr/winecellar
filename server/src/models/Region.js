const Sequelize = require("sequelize");
const db = require("../db");

const Region = db.define("Region", {
  regionName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

module.exports = Region;
