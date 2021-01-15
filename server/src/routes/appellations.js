const router = require("express").Router();
const Op = require("Sequelize").Op;

const Appellation = require("../models/Appellation");
const Region = require("../models/Region");
const Country = require("../models/Country");

module.exports = router;

// find all appellations
router.get("/", (req, res, next) => {
  Appellation.findAndCountAll({
    include: [
      {
        model: Region,
        include: [
          {
            model: Country
          }
        ]
      }
    ]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// get all Appellations and return id & name for populating dropdown selects
router.get("/ddlist", (req, res, next) => {
  Appellation.findAll({
    attributes: ["id", "appName", "commonFlg"],
    order: [
      ["commonFlg", "DESC"],
      ["appName", "ASC"]
    ]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// search for appellations by appName
router.get("/search", (req, res, next) => {
  try {
    const search = req.query;
    if (search) {
      Appellation.findAndCountAll({
        where: {
          appName: {
            [Op.like]: "%" + search.appName + "%"
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

// post a new appellation
router.post("/", (req, res, next) => {
  Appellation.create(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

// delete an appellation
router.delete("/:id", (req, res, next) => {
  Appellation.findByPk(req.params.id, {})
    .then(appellation => {
      if (appellation) {
        appellation.destroy();
        res.json(appellation);
      } else {
        res.status(404).send("appellation not found");
      }
    })
    .catch(next);
});

// update a appellation
router.put("/:id", (req, res, next) => {
  Appellation.findByPk(req.params.id, {})
    .then(appellation => {
      if (appellation) {
        appellation.update(req.body);
        res.json(appellation);
      } else {
        res.status(404).send("appellation not found");
      }
    })
    .catch(next);
});

// get appellation by id
router.get("/:id", (req, res, next) => {
  Appellation.findByPk(req.params.id, {
    include: [
      {
        model: Region,
        include: [
          {
            model: Country
          }
        ]
      }
    ]
  })
    .then(appellation => {
      if (appellation) {
        res.json(appellation);
      } else {
        res.status(404).send("appellation not found");
      }
    })
    .catch(next);
});
