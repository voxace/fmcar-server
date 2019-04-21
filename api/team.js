const Router = require("koa-router");
const controller = require("../controllers").team;
const router = new Router();

router.post("/team", controller.post);
router.get("/team", controller.get);
router.put("/team", controller.put);
router.delete("/team", controller.delete);

module.exports = router.routes();
