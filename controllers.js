const admin = require("./controllers/admin");
const auth = require("./controllers/auth");
const game = require("./controllers/game");
const points = require("./controllers/points");
const race = require("./controllers/race");
const result = require("./controllers/result");
const season = require("./controllers/season");
const series = require("./controllers/series");
const team = require("./controllers/team");
const track = require("./controllers/track");
const user = require("./controllers/user");

module.exports = {
  admin,
  auth,
  game,
  points,
  race,
  result,
  season,
  series,
  team,
  track,
  user
};
