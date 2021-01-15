const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define(
  "User",
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      isEmail: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    }
  },
  {
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  }
);

User.prototype.isPasswordValid = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
