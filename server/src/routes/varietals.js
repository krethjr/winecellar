const router = require("express").Router();
const Op = require("Sequelize").Op;

const Varietal = require("../models/Varietal");

module.exports = router;

// find all varietals
router.get("/", (req, res, next) => {
  Varietal.findAll({
    include: [{ all: true }]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// get all varietals and return id & name for populating dropdown selects
router.get("/ddlist", (req, res, next) => {
  Varietal.findAll({
    attributes: ["id", "varietalName", "commonFlg"],
    order: [
      ["commonFlg", "DESC"],
      ["varietalName", "ASC"]
    ]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// search for varietal by name, description or type
router.get("/search", (req, res, next) => {
  try {
    const search = req.query;
    if (search) {
      Varietal.findAll({
        include: [{ all: true }],
        where: {
          [Op.or]: [
            {
              varietalName: {
                [Op.like]: "%" + search.varietalName + "%"
              }
            },
            {
              varietalDesc: {
                [Op.like]: "%" + search.varietalDesc + "%"
              }
            },
            {
              varietalType: {
                [Op.eq]: search.varietalType
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

// post a new varietal
router.post("/", (req, res, next) => {
  Varietal.create(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

// delete a varietal
router.delete("/:id", (req, res, next) => {
  Varietal.findByPk(req.params.id, {})
    .then(varietal => {
      if (varietal) {
        varietal.destroy();
        res.json(varietal);
      } else {
        res.status(404).send("varietal not found");
      }
    })
    .catch(next);
});

// update a varietal
router.put("/:id", (req, res, next) => {
  Varietal.findByPk(req.params.id, {})
    .then(varietal => {
      if (varietal) {
        varietal.update(req.body);
        res.json(varietal);
      } else {
        res.status(404).send("varietal not found");
      }
    })
    .catch(next);
});

// get varietal by id
router.get("/:id", (req, res, next) => {
  Varietal.findByPk(req.params.id, {
    include: [{ all: true }]
  })
    .then(varietal => {
      if (varietal) {
        res.json(varietal);
      } else {
        res.status(404).send("varietal not found");
      }
    })
    .catch(next);
});
