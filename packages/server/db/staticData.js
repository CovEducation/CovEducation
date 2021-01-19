const fs = require("fs");

const speakerSeriesData = JSON.parse(fs.readFileSync("./speaker_series.json"));
const meetOurTeamData = JSON.parse(fs.readFileSync("./meet_our_team.json"));

const getSpeakerSeries = async () => {
  return speakerSeriesData;
};
const getTeamData = async () => {
  return meetOurTeamData;
};

module.exports = { getSpeakerSeries, getTeamData };
