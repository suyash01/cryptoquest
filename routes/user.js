const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator/check");

const User = require("../models/user");
const Auth = require("../middlewares/auth");

router.post("/login", [body("name").isLength({ min: 1 }), body("password").isLength({ min: 6 })], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ status: 0, msg: "Invalid Credentials", data: null });

  User.findOne({ name: req.body.name })
    .exec()
    .then(user => {
      bcrypt
        .compare(req.body.password, user.password)
        .then(result => {
          if (!result) return res.status(422).json({ status: 0, msg: "Invalid Credentials", data: null });
          jwt.sign({ name: user.name, role: user.role }, process.env.SECRET, { expiresIn: "6h" }, (err, token) => {
            if (err) return res.status(500).json({ status: 0, msg: "Server Error", data: null });
            return res.status(200).json({
              status: 1,
              msg: "Loggedin Successfully",
              data: { token }
            });
          });
        })
        .catch(err => {
          return res.status(500).json({ status: 0, msg: "Server Error", data: null });
        });
    })
    .catch(err => {
      return res.status(500).json({ status: 0, msg: "Server Error", data: null });
    });
});

router.post("/register", [body("name").isLength({ min: 1 }), body("password").isLength({ min: 6 })], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ status: 0, msg: "Invalid Details", data: null });

  User.findOne({ name: req.body.name })
    .exec()
    .then(user => {
      if (user) return res.status(409).json({ status: 0, msg: "Username Taken", data: null });
      bcrypt
        .hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            name: req.body.name,
            password: hash
          });
          user
            .save()
            .then(result => {
              return res.status(201).json({
                status: 1,
                msg: "Registered Successfully",
                data: null
              });
            })
            .catch(err => {
              console.error(err);
              return res.status(500).json({ status: 0, msg: "Server Error", data: null });
            });
        })
        .catch(err => {
          console.error(err);
          return res.status(500).json({ status: 0, msg: "Server Error", data: null });
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ status: 0, msg: "Server Error", data: null });
    });
});

router.post("/profile", Auth.authenticateUser, (req, res) => {
  User.findOne({ name: req.user.name })
    .select("-role -password")
    .exec()
    .then(user => {
      return res.status(200).json({ status: 1, msg: "", data: { user } });
    })
    .catch(err => {
      return res.status(500).json({ status: 0, msg: "Server Error", data: null });
    });
});

router.delete("/:id", Auth.authenticateAdmin, (req, res, next) => {
  User.remove({ _id: req.param.id })
    .exec()
    .then(result => {
      res.status(200).json({
        status: 1,
        msg: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        status: 0,
        error: "Internal Server Error"
      });
    });
});

module.exports = router;
