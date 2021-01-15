const Sequelize = require("sequelize");
// const path = require('path')
const config = require("./config/config");

const db = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options
);

module.exports = db;

// We'll define associations after we import them here;
const Appellation = require("./models/Appellation");
const Cellar = require("./models/Cellar");
const Country = require("./models/Country");
const Location = require("./models/Location");
const Order = require("./models/Order");
const Region = require("./models/Region");
const User = require("./models/User");
const Varietal = require("./models/Varietal");
const Wine = require("./models/Wine");
const Winery = require("./models/Winery");
const CellarUser = require("./models/CellarUser");
const CellarWine = require("./models/CellarWine");
const Bookmark = require("./models/Bookmark");

// Setup all 1:M relations
Region.belongsTo(Country, { as: "country" });

Appellation.belongsTo(Region, { as: "region" });

Wine.belongsTo(Winery, { as: "winery" });

Wine.belongsTo(Varietal, { as: "varietal" });

Wine.belongsTo(Appellation, { as: "appellation" });

CellarWine.belongsTo(Cellar, { as: "cellar" });

CellarWine.belongsTo(Wine, { as: "wine" });

CellarWine.belongsTo(Location, { as: "location" });

Winery.belongsTo(Appellation, { as: "defaultAppellation" });

Order.belongsTo(Wine, { as: "wine" });

Order.belongsTo(Cellar, { as: "cellar" });

Location.belongsTo(Cellar, { as: "cellar" });

Order.belongsTo(User, { as: "owner" });
Cellar.belongsTo(User, { as: "owner" });

CellarUser.belongsTo(User, { as: "user" });
CellarUser.belongsTo(Cellar, { as: "cellar" });

Bookmark.belongsTo(User, { as: "user" });
Bookmark.belongsTo(Wine, { as: "wine" });
