const Router = require("koa-router");
const controller = require("../controllers").result;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

// Add new result
router.post("/result", controller.addResult);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

// Get all results
router.get("/results", controller.getAllResults);

// Get single result by ID
router.get("/result/id/:id", controller.getResultByID);

// Get all results by session
router.get("/results/session/:session", controller.getResultsBySession);

// Get single result by User
router.get("/result/user/:user", controller.getResultByUser);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

// Update result by ID
router.patch("/result/:id", controller.patchResultByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete result by ID
router.delete("/result/:id", controller.deleteResultByID);

module.exports = router.routes();
