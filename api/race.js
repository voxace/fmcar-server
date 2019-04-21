const Router = require("koa-router");
const controller = require("../controllers").race;
const router = new Router();

router.post("/race", controller.post);
router.get("/race", controller.get);
router.put("/race", controller.put);
router.delete("/race", controller.delete);

module.exports = router.routes();
