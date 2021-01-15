const router = require("express").Router();

const Order = require("../models/Order");

module.exports = router;

// find all orders
router.get("/", (req, res, next) => {
  Order.findAll({
    include: [{ all: true }]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// post a new order
router.post("/", (req, res, next) => {
  Order.create(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

// delete a order
router.delete("/:id", (req, res, next) => {
  Order.findByPk(req.params.id, {})
    .then(order => {
      if (order) {
        order.destroy();
        res.json(order);
      } else {
        res.status(404).send("order not found");
      }
    })
    .catch(next);
});

// update a order
router.put("/:id", (req, res, next) => {
  Order.findByPk(req.params.id, {})
    .then(order => {
      if (order) {
        order.update(req.body);
        res.json(order);
      } else {
        res.status(404).send("order not found");
      }
    })
    .catch(next);
});

// get order by id
router.get("/:id", (req, res, next) => {
  Order.findByPk(req.params.id, {
    include: [{ all: true }]
  })
    .then(order => {
      if (order) {
        res.json(order);
      } else {
        res.status(404).send("order not found");
      }
    })
    .catch(next);
});
