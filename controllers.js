const auth = require("./controllers/auth");
const game = require("./controllers/game");
const points = require("./controllers/points");
const session = require("./controllers/session");
const result = require("./controllers/result");
const round = require("./controllers/round");
const season = require("./controllers/season");
const series = require("./controllers/series");
const team = require("./controllers/team");
const track = require("./controllers/track");
const user = require("./controllers/user");

module.exports = {
  auth,
  game,
  points,
  session,
  result,
  round,
  season,
  series,
  team,
  track,
  user
};
