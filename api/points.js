const Router = require("koa-router");
const controller = require("../controllers").points;
const router = new Router();

router.post("/points", controller.post);
router.get("/points", controller.get);
router.put("/points", controller.put);
router.delete("/points", controller.delete);

module.exports = router.routes();