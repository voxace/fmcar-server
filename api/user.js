const Router = require("koa-router");
const controller = require("../controllers").user;
const router = new Router();

router.post("/user", controller.post);
router.get("/user", controller.get);
router.put("/user", controller.put);
router.delete("/user", controller.delete);

module.exports = router.routes();
