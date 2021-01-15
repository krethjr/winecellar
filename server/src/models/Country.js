const Sequelize = require("sequelize");
const db = require("../db");

const Country = db.define("Country", {
  countryName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  isoAlpha3Code: Sequelize.STRING(3),
  isoNumericCode: Sequelize.INTEGER,
  commonFlg: Sequelize.BOOLEAN
});

module.exports = Country;
