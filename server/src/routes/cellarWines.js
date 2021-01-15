const router = require("express").Router();
const Op = require("Sequelize").Op;

const CellarWine = require("../models/CellarWine");
const Cellar = require("../models/Cellar");
const Wine = require("../models/Wine");
const Winery = require("../models/Winery");
const Location = require("../models/Location");
const Varietal = require("../models/Varietal");

module.exports = router;

// find all wines in all Cellars
router.get("/", (req, res, next) => {
  CellarWine.findAll({
    include: [
      {
        model: Wine,
        as: "wine",
        include: [
          {
            model: Winery,
            as: "winery"
          },
          {
            model: Varietal,
            as: "varietal"
          }
        ]
      },
      {
        model: Cellar,
        as: "cellar"
      },
      {
        model: Location,
        as: "location"
      }
    ]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// search for wines by name or description or barcode
router.get("/search", (req, res, next) => {
  try {
    const search = req.query;
    if (search) {
      CellarWine.findAll({
        include: [{ all: true }],
        where: {
          [Op.or]: [
            {
              wineName: {
                [Op.like]: "%" + search.wineName + "%"
              }
            },
            {
              wineDesc: {
                [Op.like]: "%" + search.wineDesc + "%"
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

// post a new wine for the cellar
router.post("/", (req, res, next) => {
  console.log("req.body:", req.body);
  CellarWine.create(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

// delete a wine
router.delete("/:id", (req, res, next) => {
  CellarWine.findByPk(req.params.id, {})
    .then(cellarWine => {
      if (cellarWine) {
        cellarWine.destroy();
        res.json(cellarWine);
      } else {
        res.status(404).send("wine not found");
      }
    })
    .catch(next);
});

// update a cellarWine
router.put("/:id", (req, res, next) => {
  CellarWine.findByPk(req.params.id, {})
    .then(cellarWine => {
      if (cellarWine) {
        cellarWine.update(req.body);
        res.json(cellarWine);
      } else {
        res.status(404).send("cellarWine not found");
      }
    })
    .catch(next);
});

// get cellarWine by id
router.get("/:id", (req, res, next) => {
  CellarWine.findByPk(req.params.id, {
    include: [{ all: true }]
  })
    .then(cellarWine => {
      if (cellarWine) {
        res.json(cellarWine);
      } else {
        res.status(404).send("wine not found");
      }
    })
    .catch(next);
});
