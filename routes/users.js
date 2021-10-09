const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

router.get("/", (req, res) => {
  res.send("respond with a resource");
});

module.exports = router;
