const express = require("express");
const volleyball = require("volleyball");
// const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const db = require("./db");
const config = require("./config/config");

// our routers
const regionsRouter = require("./routes/regions");
const appellationsRouter = require("./routes/appellations");
const cellarsRouter = require("./routes/cellars");
const countriesRouter = require("./routes/countries");
const locationsRouter = require("./routes/locations");
const ordersRouter = require("./routes/orders");
const varietalsRouter = require("./routes/varietals");
const wineriesRouter = require("./routes/wineries");
const winesRouter = require("./routes/wines");
const cellarWinesRouter = require("./routes/cellarWines");
const usersRouter = require("./routes/users");
const bookmarksRouter = require("./routes/bookmarks");

// instantiate an instance of an express server
const app = express();

// Logging and body parsing middleware does not have a path argument
// but just a callback function. If the first argument to an app.use call
// is a callback, it always matches that middleware on every request.

// logging middleware - written by Fullstack's own Gabriel Lebec!
app.use(volleyball);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

// API routers to serve up data from the server
app.use("/regions", regionsRouter);
app.use("/appellations", appellationsRouter);
app.use("/cellars", cellarsRouter);
app.use("/countries", countriesRouter);
app.use("/locations", locationsRouter);
app.use("/orders", ordersRouter);
app.use("/varietals", varietalsRouter);
app.use("/wineries", wineriesRouter);
app.use("/wines", winesRouter);
app.use("/cellarwines", cellarWinesRouter);
app.use("/users", usersRouter);
app.use("/bookmarks", bookmarksRouter);

app.use("*", function(req, res, next) {
  res.status(404).send({
    error: "unknown route specified"
  });
});

// require("./routes")(app);

var server = app.listen(config.port, () => {
  console.log(
    "Server operating and listening on port",
    server.address().port,
    "..."
  );
  db.sync({
    force: false
  })
    .then(message => {
      console.log("...and db is synced!");
    })
    .catch(function(err) {
      throw err;
    });
});
