const Sequelize = require("sequelize");
const db = require("../db");

const Varietal = db.define("Varietal", {
  varietalName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  varietalType: {
    type: Sequelize.STRING(5),
    values: ["Red", "White", "Blush"]
  },
  commonFlg: Sequelize.BOOLEAN,
  varietalDesc: Sequelize.TEXT
});

module.exports = Varietal;
