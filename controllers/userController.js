const { body, validationResult } = require("express-validator");
// const async = require("async");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.sign_up_get = (req, res) => {
  res.render("sign-up");
};

exports.sign_up_post = [
  body("firstname")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified")
    .isAlphanumeric()
    .withMessage("First name has non_alphanumeric() characters."),
  body("lastname")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified")
    .isAlphanumeric()
    .withMessage("Last name has non_alphanumeric() characters."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must be at least six characters"),
  body("confirm-password")
    .escape()
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.password;
      if (password !== confirmPassword) {
        throw new Error("Passwords must match");
      }
    }),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must be specified")
    .isAlphanumeric()
    .withMessage("Username has non_alphanumeric() characters."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("sign-up", {
        errors: errors.array(),
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        // if err, do something
        // otherwise, store hashedPassword in DB
        const user = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: hashedPassword,
          membership: false,
        });
        user.save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      });
    }
  },
];

exports.membership_get = (req, res) => {
  res.render("membership", { user: req.user });
};

exports.membership_post = [
  body("secret-code")
    .trim()
    .escape()
    .custom(async (code) => {
      const memberCode = "cats";
      const adminCode = "admin";
      if (code !== memberCode && code !== adminCode) {
        throw new Error("Wrong Secret Code");
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("membership", {
        errors: errors.array(),
        user: req.user,
      });
    } else {
      // if err, do something
      // otherwise, store hashedPassword in DB
      const user = req.user;
      user.membership = true;
      user.admin = req.body["secret-code"] === "admin" ? true : false;
      user.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    }
  },
];

exports.log_in_get = (req, res) => {
  res.render("log-in");
};
