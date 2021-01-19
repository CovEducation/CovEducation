const express = require("express");
const db = require("../db/staticData");
var router = express.Router();

/**
 * Gets a speaker series data from Json.
 */
router.post("/getSpeakerSeries", async function (req, res) {
  try {
    const speakerSeries = await db.getSpeakerSeries();
    res.send(speakerSeries);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * Gets a Team  data from Json.
 */
router.post("/getTeamData", async function (req, res) {
  try {
    const teamData = await db.getTeamData();
    res.send(teamData);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
