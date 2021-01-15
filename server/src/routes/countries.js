const router = require("express").Router();
const Op = require("Sequelize").Op;

const Country = require("../models/Country");

module.exports = router;

// find all countries
router.get("/", (req, res, next) => {
  Country.findAll({})
    .then(res.send.bind(res))
    .catch(next);
});

// search for countries by countryName or isoAlpha3Code
router.get("/search", (req, res, next) => {
  try {
    const search = req.query;
    if (search) {
      Country.findAll({
        where: {
          [Op.or]: [
            {
              countryName: {
                [Op.like]: "%" + search.countryName + "%"
              }
            },
            {
              isoAlpha3Code: {
                [Op.like]: "%" + search.isoAlpha3Code + "%"
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

// post a new country
router.post("/", (req, res, next) => {
  Country.create(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

// delete a country
router.delete("/:id", (req, res, next) => {
  Country.findByPk(req.params.id, {})
    .then(country => {
      if (country) {
        country.destroy();
        res.json(country);
      } else {
        res.status(404).send("country not found");
      }
    })
    .catch(next);
});

// update a country
router.put("/:id", (req, res, next) => {
  Country.findByPk(req.params.id, {})
    .then(country => {
      if (country) {
        country.update(req.body);
        res.json(country);
      } else {
        res.status(404).send("country not found");
      }
    })
    .catch(next);
});

// get country by id
router.get("/:id", (req, res, next) => {
  Country.findByPk(req.params.id, {})
    .then(country => {
      if (country) {
        res.json(country);
      } else {
        res.status(404).send("country not found");
      }
    })
    .catch(next);
});
