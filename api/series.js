const Router = require("koa-router");
const controller = require("../controllers").series;
const router = new Router();

router.post("/series", controller.post);
router.get("/series", controller.get);
router.put("/series", controller.put);
router.delete("/series", controller.delete);

module.exports = router.routes();
