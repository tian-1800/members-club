const { body, validationResult } = require("express-validator");
const async = require("async");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/user");
const Message = require("../models/message");

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
          membership: "user",
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

exports.sign_up_member_get = (req, res) => {
  res.render("sign-up-member");
};

exports.sign_up_member_post = [
  body("secret-code")
    .trim()
    .escape()
    .custom(async (code) => {
      const secretCode = "cats";
      if (code !== secretCode) {
        throw new Error("Wrong Secret Code");
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("sign-up-member", {
        errors: errors.array(),
      });
    } else {
      // if err, do something
      // otherwise, store hashedPassword in DB
      const user = req.user;
      user.membership = "member";
      user.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    }
  },
];

exports.log_in_get = () => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  });
};
