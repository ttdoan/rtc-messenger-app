const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

module.exports = router;
