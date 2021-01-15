const router = require("express").Router();
const Op = require("Sequelize").Op;
const Sequelize = require("sequelize");
const db = require("../db");

const Wine = require("../models/Wine");
const Winery = require("../models/Winery");
const Varietal = require("../models/Varietal");
const wotdRatingMin = 85;

module.exports = router;

// find all wines
router.get("/", (req, res, next) => {
  Wine.findAll({
    include: [{ all: true }]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// return a random wine with an overallRating equel to 90 or above
router.get("/random", (req, res, next) => {
  Wine.findOne({
    include: [{ all: true }],
    where: {
      overallRating: {
        [Op.gte]: wotdRatingMin
      }
    },
    order: db.random()
  })
    .then(res.send.bind(res))
    .catch(next);
});

// search for wines by name or description or barcode
router.get("/search", (req, res, next) => {
  try {
    const search = req.query;
    console.log(search);
    if (search) {
      Wine.findAll({
        include: [{ all: true }],
        where: {
          [Op.or]: [
            {
              wineName: {
                [Op.like]: "%" + search.value + "%"
              }
            },
            {
              wineDesc: {
                [Op.like]: "%" + search.value + "%"
              }
            },
            {
              upcBarcode: {
                [Op.eq]: search.upcBarcode
              }
            }
          ]
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

// post a new wine
router.post("/", (req, res, next) => {
  Wine.create(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

// delete a wine
router.delete("/:id", (req, res, next) => {
  Wine.findByPk(req.params.id, {})
    .then(wine => {
      if (wine) {
        wine.destroy();
        res.json(wine);
      } else {
        res.status(404).send("wine not found");
      }
    })
    .catch(next);
});

// update a wine
router.put("/:id", (req, res, next) => {
  Wine.findByPk(req.params.id, {})
    .then(wine => {
      if (wine) {
        wine.update(req.body);
        res.json(wine);
      } else {
        res.status(404).send("wine not found");
      }
    })
    .catch(next);
});

// get wine by id
router.get("/:id", (req, res, next) => {
  Wine.findByPk(req.params.id, {
    include: [{ all: true }]
  })
    .then(wine => {
      if (wine) {
        res.json(wine);
      } else {
        res.status(404).send("wine not found");
      }
    })
    .catch(next);
});
