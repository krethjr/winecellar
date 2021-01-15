const db = require("./db");

const User = require("./models/User");
const Varietal = require("./models/Varietal");
const Country = require("./models/Country");
const Region = require("./models/Region");
const Appellation = require("./models/Appellation");
const Wine = require("./models/Wine");
const Location = require("./models/Location");
const Cellar = require("./models/Cellar");
const Winery = require("./models/Winery");
const Order = require("./models/Order");
const CellarUser = require("./models/CellarUser");
const CellarWine = require("./models/CellarWine");
const Bookmark = require("./models/Bookmark");

const Promise = require("bluebird");

const users = require("../seed/users.json");
const varietals = require("../seed/varietals.json");
const countries = require("../seed/countries.json");
const regions = require("../seed/regions.json");
const appellations = require("../seed/appellations.json");
const wines = require("../seed/wines.json");
const locations = require("../seed/locations.json");
const cellars = require("../seed/cellars.json");
const wineries = require("../seed/wineries.json");
const cellarUsers = require("../seed/cellarUsers.json");
const cellarWines = require("../seed/cellarWines.json");
const orders = require("../seed/orders.json");
const bookmarks = require("../seed/bookmarks.json");

db.sync({ force: true })
  .then(() => {
    console.log("synced winecellar DB and dropped old data");
  })
  .then(async function() {
    await Promise.all(
      users.map(user => {
        User.create(user);
      })
    );
  })
  .then(async function() {
    await Promise.all(
      countries.map(country => {
        Country.create(country);
      })
    );
  })
  .then(async function() {
    await Promise.all(
      regions.map(region => {
        Region.create(region);
      })
    );
  })
  .then(async function() {
    await Promise.all(
      appellations.map(appellation => {
        Appellation.create(appellation);
      })
    );
  })
  .then(async function() {
    await Promise.all(
      varietals.map(varietal => {
        Varietal.create(varietal);
      })
    );
  })
  .then(async function() {
    await Promise.all(
      cellars.map(cellar => {
        Cellar.create(cellar);
      })
    );
  })
  .then(async function() {
    await Promise.all(
      locations.map(location => {
        Location.create(location);
      })
    );
  })
  .then(async function() {
    await Promise.all(
      cellarUsers.map(cellarUser => {
        CellarUser.create(cellarUser);
      })
    );
  })
  .then(async function() {
    await Promise.all(
      wineries.map(winery => {
        Winery.create(winery);
      })
    );
  })
  .then(async function() {
    await Promise.all(
      wines.map(wine => {
        Wine.create(wine);
      })
    );
  })
  .then(async function() {
    await Promise.all(
      cellarWines.map(cellarWine => {
        CellarWine.create(cellarWine);
      })
    );
  })
  .then(async function() {
    await Promise.all(
      bookmarks.map(bookmark => {
        Bookmark.create(bookmark);
      })
    );
  })
  .then(async function() {
    await Promise.all(
      orders.map(order => {
        Order.create(order);
      })
    );
  })
  .catch(error => {
    console.log(error);
  });
