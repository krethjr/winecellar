const router = require("express").Router();

const Bookmark = require("../models/Bookmark");
const Wine = require("../models/Wine");

module.exports = router;

// find all bookmark
router.get("/", (req, res, next) => {
  Bookmark.findAndCountAll({
    include: [
      {
        model: Wine
      }
    ]
  })
    .then(res.send.bind(res))
    .catch(next);
});

// post a new bookmark
router.post("/", (req, res, next) => {
  Bookmark.create(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

// delete an bookmark
router.delete("/:id", (req, res, next) => {
  const userId = req.user.id;
  const { bookmarkId } = req.params;
  Bookmark.findOne(req.params.id, {
    where: {
      id: bookmarkId,
      UserId: userId
    }
  })
    .then(bookmark => {
      if (bookmark) {
        bookmark.destroy();
        res.json(bookmark);
      } else {
        res.status(404).send("bookmark not found");
      }
    })
    .catch(next);
});

// update a appellation
router.put("/:id", (req, res, next) => {
  Bookmark.findByPk(req.params.id, {})
    .then(bookmark => {
      if (bookmark) {
        bookmark.update(req.body);
        res.json(bookmark);
      } else {
        res.status(404).send("bookmark not found");
      }
    })
    .catch(next);
});

// get appellation by id
router.get("/:id", (req, res, next) => {
  Bookmark.findByPk(req.params.id, {
    include: [
      {
        model: Wine
      }
    ]
  })
    .then(bookmark => {
      if (bookmark) {
        res.json(bookmark);
      } else {
        res.status(404).send("bookmark not found");
      }
    })
    .catch(next);
});
