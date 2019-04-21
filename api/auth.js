const Router = require("koa-router");
const controller = require("../controllers").auth;
const router = new Router();

router.post("/auth", controller.post);
router.get("/auth", controller.get);
router.put("/auth", controller.put);
router.delete("/auth", controller.delete);

module.exports = router.routes();
