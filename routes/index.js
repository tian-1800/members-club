var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController");

router.get("/sign-up", user_controller.sign_up_get);
router.post("/sign-up", user_controller.sign_up_post);
router.post("/log-in", user_controller.log_in_get);
router.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { user: req.user });
});

module.exports = router;
