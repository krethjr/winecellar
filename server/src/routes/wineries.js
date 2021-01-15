const router = require("express").Router();
const Op = require("Sequelize").Op;

const Winery = require("../models/Winery");

module.exports = router;

// find all wineries
router.get("/", (req, res, next) => {
  Winery.findAll({
    include: [{ all: true }]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// get all wineries and return id & name for populating dropdown selects
router.get("/ddlist", (req, res, next) => {
  Winery.findAll({
    attributes: ["id", "wineryName"],
    order: [["wineryName", "ASC"]]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// search for wineries by wineryName
router.get("/search", (req, res, next) => {
  try {
    const search = req.query;
    if (search) {
      Winery.findAll({
        include: [{ all: true }],
        where: {
          wineryName: {
            [Op.like]: "%" + search.wineryName + "%"
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

// post a new winery
router.post("/", (req, res, next) => {
  Winery.create(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

// delete a winery
router.delete("/:id", (req, res, next) => {
  Winery.findByPk(req.params.id, {})
    .then(winery => {
      if (winery) {
        winery.destroy();
        res.json(winery);
      } else {
        res.status(404).send("winery not found");
      }
    })
    .catch(next);
});

// update a winery
router.put("/:id", (req, res, next) => {
  Winery.findByPk(req.params.id, {})
    .then(winery => {
      if (winery) {
        winery.update(req.body);
        res.json(winery);
      } else {
        res.status(404).send("winery not found");
      }
    })
    .catch(next);
});

// get winery by id
router.get("/:id", (req, res, next) => {
  Winery.findByPk(req.params.id, {
    include: [{ all: true }]
  })
    .then(winery => {
      if (winery) {
        res.json(winery);
      } else {
        res.status(404).send("winery not found");
      }
    })
    .catch(next);
});
