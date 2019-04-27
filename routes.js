const Router = require("koa-router");
const router = new Router();
const api = new Router();

const admin = require("./api/admin");
const auth = require("./api/auth");
const game = require("./api/game");
const points = require("./api/points");
const race = require("./api/race");
const result = require("./api/result");
const season = require("./api/season");
const series = require("./api/series");
const team = require("./api/team");
const track = require("./api/track");
const user = require("./api/user");

api.use(admin);
api.use(auth);
api.use(game);
api.use(points);
api.use(race);
api.use(result);
api.use(season);
api.use(series);
api.use(team);
api.use(track);
api.use(user);

router.use("/api", api.routes());

module.exports = router;
