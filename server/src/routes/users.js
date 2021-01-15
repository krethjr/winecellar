const router = require("express").Router();
const Op = require("Sequelize").Op;

const User = require("../models/User");

module.exports = router;

// find all users
router.get("/", (req, res, next) => {
  User.findAndCountAll({})
    .then(res.send.bind(res))
    .catch(next);
});

// search for users by name or email
router.get("/search", (req, res, next) => {
  try {
    const search = req.query;
    if (search) {
      User.findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search.name + "%"
              }
            },
            {
              email: {
                [Op.eq]: search.email
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

// post a new user
router.post("/", (req, res, next) => {
  User.create(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

// delete a user
router.delete("/:id", (req, res, next) => {
  User.findByPk(req.params.id, {})
    .then(user => {
      if (user) {
        user.destroy();
        res.json(user);
      } else {
        res.status(404).send("user not found");
      }
    })
    .catch(next);
});

// update a user
router.put("/:id", (req, res, next) => {
  User.findByPk(req.params.id, {})
    .then(user => {
      if (user) {
        user.update(req.body);
        res.json(user);
      } else {
        res.status(404).send("user not found");
      }
    })
    .catch(next);
});

// get user by id
router.get("/:id", (req, res, next) => {
  User.findByPk(req.params.id, {})
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("user not found");
      }
    })
    .catch(next);
});
