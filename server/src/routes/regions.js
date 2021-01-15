const router = require("express").Router();
const Op = require("Sequelize").Op;

const Region = require("../models/Region");
const Country = require("../models/Country");

module.exports = router;

// find all foods
router.get("/", (req, res, next) => {
  Region.findAll({
    include: [{ all: true }]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// search for regions by regionName
router.get("/search", (req, res, next) => {
  try {
    const search = req.query;
    if (search) {
      Region.findAll({
        include: [{ all: true }],
        where: {
          regionName: {
            [Op.like]: "%" + search.regionName + "%"
          }
        }
      })
        .then(res.send.bind(res))
        .catch(next);
    } else {
      res.status(400).send({
        error: "invalid search specified"
      });
    }
  } catch (err) {
    res.status(500).send({
      error: "an error has occured trying to fetch the countries"
    });
  }
});

// post a new region
router.post("/", (req, res, next) => {
  Region.create(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

// delete a region
router.delete("/:id", (req, res, next) => {
  Region.findByPk(req.params.id, {})
    .then(region => {
      if (region) {
        region.destroy();
        res.json(region);
      } else {
        res.status(404).send("region not found");
      }
    })
    .catch(next);
});

// update a region
router.put("/:id", (req, res, next) => {
  Region.findByPk(req.params.id, {})
    .then(region => {
      if (region) {
        region.update(req.body);
        res.json(region);
      } else {
        res.status(404).send("region not found");
      }
    })
    .catch(next);
});

// get region by id
router.get("/:id", (req, res, next) => {
  Region.findByPk(req.params.id, {
    include: [{ all: true }]
  })
    .then(res.send.bind(res))
    .catch(next);
});
