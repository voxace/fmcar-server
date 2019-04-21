const Router = require("koa-router");
const controller = require("../controllers").game;
const router = new Router();

router.post("/game", controller.post);
router.get("/game", controller.get);
router.put("/game", controller.put);
router.delete("/game", controller.delete);

module.exports = router.routes();
