const router = require("express").Router();

const Cellar = require("../models/Cellar");
const User = require("../models/User");

module.exports = router;

// find all cellars
router.get("/", (req, res, next) => {
  Cellar.findAndCountAll({
    order: [["id", "ASC"]],
    include: [
      {
        model: User,
        as: "owner"
      }
    ]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// post a new cellar
router.post("/", (req, res, next) => {
  Cellar.create(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

// delete a cellar
router.delete("/:id", (req, res, next) => {
  Cellar.findByPk(req.params.id, {})
    .then(cellar => {
      if (cellar) {
        cellar.destroy();
        res.json(cellar);
      } else {
        res.status(404).send("cellar not found");
      }
    })
    .catch(next);
});

// update a cellar
router.put("/:id", (req, res, next) => {
  Cellar.findByPk(req.params.id, {})
    .then(cellar => {
      if (cellar) {
        cellar.update(req.body);
        res.json(cellar);
      } else {
        res.status(404).send("cellar not found");
      }
    })
    .catch(next);
});

// get cellar by id
router.get("/:id", (req, res, next) => {
  Cellar.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: "owner"
      }
    ]
  })
    .then(cellar => {
      if (cellar) {
        res.json(cellar);
      } else {
        res.status(404).send("cellar not found");
      }
    })
    .catch(next);
});
