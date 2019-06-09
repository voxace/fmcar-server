const Router = require("koa-router");
const controller = require("../controllers").series;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Create a new series and its first season
 * @param {string} name - The name of the series.
 * @param {number} year - The year of the series.
 * @param {string} game - The ID of the game.
 */
router.post("/series", controller.addSeries);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

/** Get all series */
router.get("/series", controller.getAllSeries);

/**
 * Get a single series
 * @param {string} id - The ID of the series.
 */
router.get("/series/id/:id", controller.getSeriesByID);

/**
 * Get all series by Name
 * @param {string} name - The name of the series.
 */
router.get("/series/name/:name", controller.getAllSeriesByName);

/**
 * Get all series by year
 * @param {number} year - The year of the series.
 */
router.get("/series/year/:year", controller.getAllSeriesByYear);

/**
 * Get all series by game
 * @param {string} game - The ID of the game.
 */
router.get("/series/game/:game", controller.getAllSeriesByGame);

/**
 * Get a single series by name and year
 * @param {string} name - The name of the series.
 * @param {number} year - The year of the series.
 */
router.get("/series/name/:name/year/:year", controller.getSeriesByNameAndYear);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Update all series details by ID
 * @param {string} id - The ID of the series
 * @param {object} model - The model of the series
 */
router.patch("/series/:id", controller.patchSeriesByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete series by ID
router.delete("/series/:id", controller.deleteSeriesByID);

module.exports = router.routes();
