const router = require("express").Router();

const Location = require("../models/Location");

module.exports = router;

// find all locations
router.get("/", (req, res, next) => {
  Location.findAll({
    include: [{ all: true }]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// get all locations and return id & name for populating dropdown selects
router.get("/ddlist", (req, res, next) => {
  Location.findAll({
    attributes: ["id", "locationName"],
    order: [["locationName", "ASC"]]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// post a new location
router.post("/", (req, res, next) => {
  Location.create(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

// delete a location
router.delete("/:id", (req, res, next) => {
  Location.findByPk(req.params.id, {})
    .then(location => {
      if (location) {
        location.destroy();
        res.json(location);
      } else {
        res.status(404).send("location not found");
      }
    })
    .catch(next);
});

// update a location
router.put("/:id", (req, res, next) => {
  Location.findByPk(req.params.id, {})
    .then(location => {
      if (location) {
        location.update(req.body);
        res.json(location);
      } else {
        res.status(404).send("location not found");
      }
    })
    .catch(next);
});

// get location by id
router.get("/:id", (req, res, next) => {
  Location.findByPk(req.params.id, {
    include: [{ all: true }]
  })
    .then(location => {
      if (location) {
        res.json(location);
      } else {
        res.status(404).send("location not found");
      }
    })
    .catch(next);
});
