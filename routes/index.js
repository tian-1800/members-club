var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

// User Controller Routes
router.get("/sign-up-member", user_controller.sign_up_member_get);
router.post("/sign-up-member", user_controller.sign_up_member_post);
router.get("/sign-up", user_controller.sign_up_get);
router.post("/sign-up", user_controller.sign_up_post);
router.get("/log-in", user_controller.log_in_get);
router.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Message Controller Routes
router.get("/new-message", message_controller.create_message_get);
router.post("/new-message", message_controller.create_message_post);

/* GET home page. */
router.get("/", message_controller.home);

module.exports = router;
