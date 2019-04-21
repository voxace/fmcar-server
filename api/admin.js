const Router = require("koa-router");
const controller = require("../controllers").admin;
const router = new Router();

router.post("/admin", controller.post);
router.get("/admin", controller.get);
router.put("/admin", controller.put);
router.delete("/admin", controller.delete);

module.exports = router.routes();
