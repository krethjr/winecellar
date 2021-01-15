const Sequelize = require("sequelize");
const db = require("../db");

const Location = db.define("Location", {
  locationName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  defaultFlg: Sequelize.BOOLEAN
});

module.exports = Location;
