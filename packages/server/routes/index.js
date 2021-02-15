const express = require("express");

const router = express.Router();

router.get("/heartbeat", (req, res) => {
  res.send("coved api is working");
});

module.exports = router;
