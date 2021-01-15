const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("Order", {
  quantity: Sequelize.INTEGER,
  pricePerUnit: Sequelize.DECIMAL(10, 2),
  orderDt: Sequelize.DATE,
  orderedFrom: Sequelize.STRING,
  futuresFlg: Sequelize.BOOLEAN,
  expDeliveryDt: Sequelize.DATE,
  deliveryLocation: Sequelize.STRING
});

module.exports = Order;
