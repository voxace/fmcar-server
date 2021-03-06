const Router = require("koa-router");
const controller = require("../controllers").auth;
const router = new Router();

router.post("/auth/register", controller.register);
router.post("/auth/login", controller.login);
router.post("/auth/verify", controller.verify);

module.exports = router.routes();
