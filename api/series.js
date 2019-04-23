const Router = require("koa-router");
const controller = require("../controllers").series;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

// Add new series
router.post("/series", controller.addSeries);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

// Get all series
router.get("/series", controller.getAllSeries);

// Get single series by ID
router.get("/series/id/:id", controller.getSeriesByID);

// Get single series by Name
router.get("/series/name/:name", controller.getSeriesByName);

// Get all series by Year
router.get("/series/year/:year", controller.getSeriesByYear);

// Get all series by Game
router.get("/series/game/:game", controller.getSeriesByGame);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

// Update all series details by ID
router.patch("/series/:id", controller.patchSeriesByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete series by ID
router.delete("/series/:id", controller.deleteSeriesByID);

module.exports = router.routes();
