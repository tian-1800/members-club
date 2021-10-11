const { body, validationResult } = require("express-validator");
// const async = require("async");
// const bcrypt = require("bcryptjs");
// const passport = require("passport");

// const User = require("../models/user");
const Message = require("../models/message");

exports.home = (req, res, next) => {
  Message.find().exec((err, list) => {
    if (err) return next(err);
    res.render("index", { message_list: list, user: req.user });
  });
};

exports.create_message_get = (req, res) => {
  res.render("create-message", { user: req.user });
};

exports.create_message_post = [
  body("message")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Message cannot be empty"),
  body("title").trim().escape().optional({ checkFalsy: true }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("create-message", {
        errors: errors.array(),
        user: req.user,
      });
    } else {
      const title = req.body.title === "" ? "(Untitled)" : req.body.title;
      const message = new Message({
        title: title,
        content: req.body.message,
        timeStamp: Date(),
        author: req.user,
      });
      message.save((err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        res.redirect("/");
      });
    }
  },
];
