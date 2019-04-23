const router = require("express").Router();
const { body, validationResult } = require("express-validator/check");

const Chal = require("../models/chal");
const Answer = require("../models/answer");
const Auth = require("../middlewares/auth");

router.post(
  "/add",
  [body("title").isLength({ min: 1 }), body("author").isLength({ min: 1 }), body("points").isNumeric(), body("flag").isLength({ min: 1 })],
  Auth.authenticateAdmin,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 0, msg: "Invalid Details", data: null });

    const chal = new Chal({
      title: req.body.title,
      desc: req.body.desc,
      author: req.body.author,
      points: req.body.points,
      flag: req.body.flag
    });
    chal
      .save()
      .then(chal => {
        return res.status(201).json({ status: 0, msg: "Chal Created", data: null });
      })
      .catch(err => {
        return res.status(500).json({ status: 0, msg: "Server Error", data: null });
      });
  }
);

router.get("/", Auth.authenticateAll, (req, res, next) => {
  if (req.user.role === "user") {
    Chal.find({}, "title desc points files author users")
      .exec()
      .then(chals => {
        res.status(200).json({ status: 1, msg: "", data: { chals } });
      })
      .catch(err => {
        res.status(500).json({ status: 0, msg: "Server Error", data: null });
      });
  } else {
    Chal.find({})
      .exec()
      .then(chals => {
        res.status(200).json({ status: 1, msg: "", data: { chals } });
      })
      .catch(err => {
        res.status(500).json({ status: 0, msg: "Server Error", data: null });
      });
  }
});

router.post("/:id", [body("flag").isLength({ min: 1 })], Auth.authenticateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ status: 0, msg: "Flag is required", data: null });

  Chal.findById(req.params.id)
    .exec()
    .then(chal => {
      if (chal.flag === req.body.flag) {
        if (chal.users.indexOf(req.user.username) === -1) {
          const answer = new Answer({
            chal: chal.title,
            user: req.user.name,
            flag: req.body.flag,
            status: "Correct"
          });
          answer
            .save()
            .then(ans => {
              Chal.findByIdAndUpdate(req.params.id, { $push: { users: req.user.name } })
                .exec()
                .then(result => {
                  return res.status(200).json({ status: 1, msg: "Correct", data: null });
                })
                .catch(err => {
                  return res.status(500).json({ status: 0, msg: "Server Error", data: null });
                });
            })
            .catch(err => {
              res.status(500).json({ status: 0, msg: "Server Error", data: null });
            });
        } else return res.status(200).json({ status: 0, msg: "Already Solved", data: null });
      } else {
        const answer = new Answer({
          chal: chal.title,
          user: req.user.name,
          flag: req.body.flag,
          status: "Wrong"
        });
        answer
          .save()
          .then(ans => {
            return res.status(200).json({ status: 0, msg: "Wrong", data: null });
          })
          .catch(err => {
            res.status(500).json({ status: 0, msg: "Server Error", data: null });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ status: 0, msg: "Server Error", data: null });
    });
});

router.delete("/:id", Auth.authenticateAdmin, (req, res, next) => {
  Chal.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        status: 1,
        msg: "Chal deleted",
        data: null
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        status: 0,
        msg: "Internal Server Error",
        data: null
      });
    });
});

module.exports = router;
