const Router = require("koa-router");
const router = new Router();
const api = new Router();

const auth = require("./api/auth");
const game = require("./api/game");
const points = require("./api/points");
const session = require("./api/session");
const result = require("./api/result");
const round = require("./api/round");
const season = require("./api/season");
const series = require("./api/series");
const team = require("./api/team");
const track = require("./api/track");
const upload = require("./api/upload");
const user = require("./api/user");

api.use(auth);
api.use(game);
api.use(points);
api.use(session);
api.use(result);
api.use(round);
api.use(season);
api.use(series);
api.use(team);
api.use(track);
api.use(upload);
api.use(user);

router.use("/api", api.routes());

module.exports = router;
