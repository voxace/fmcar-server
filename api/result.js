const Router = require("koa-router");
const controller = require("../controllers").result;
const router = new Router();

router.post("/result", controller.post);
router.get("/result", controller.get);
router.put("/result", controller.put);
router.delete("/result", controller.delete);

module.exports = router.routes();
