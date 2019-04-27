const Router = require("koa-router");
const controller = require("../controllers").series;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Create a new series
 * @param {string} name - The name of the series.
 * @param {number} year - The year of the series.
 * @param {number} season - The season of the series.
 * @param {string} game - The ID of the game.
 */
router.post("/series", controller.addSeries);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

/** Get all series */
router.get("/series", controller.getAllSeries);

/** Get all series including team details */
router.get("/series/teams", controller.getAllSeriesWithTeams);

/**
 * Get a single series
 * @param {string} id - The ID of the series.
 */
router.get("/series/id/:id", controller.getSeriesByID);

/**
 * Get a single series including team details
 * @param {string} id - The ID of the series.
 */
router.get("/series/teams/:id", controller.getSeriesWithTeamsByID);

/**
 * Get all series by Name
 * @param {string} name - The name of the series.
 */
router.get("/series/name/:name", controller.getAllSeriesByName);

/**
 * Get all series by name including team details
 * @param {string} name - The name of the series.
 */
router.get("/series/teams/name/:name", controller.getAllSeriesWithTeamsByName);

/**
 * Get all series by year
 * @param {number} year - The year of the series.
 */
router.get("/series/year/:year", controller.getSeriesByYear);

/**
 * Get all series by game
 * @param {string} game - The ID of the game.
 */
router.get("/series/game/:game", controller.getSeriesByGame);

/**
 * Get a single series by name and year
 * @param {string} name - The name of the series.
 * @param {number} year - The year of the series.
 */
router.get("/series/name/:name/year/:year", controller.getSeriesByNameAndYear);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Update all series details by ID
 * @param {string} id - The ID of the series.
 * @param {string} name [optional] - The name of the series.
 * @param {string} game [optional] - The id of the game.
 * @param {number} year [optional] - The year of the series.
 * @param {string} banner [optional] - The banner (image) of the series.
 * @param {string} logo [optional] - The logo (image) of the series.
 */
router.patch("/series/:id", controller.patchSeriesByID);

/**
 * Add a team to a series season
 * @param {string} id - The ID of the season.
 * @param {string} team - The ID of the team.
 */
router.patch("/series/:id/add/team/:team", controller.addTeam);

/**
 * Remove a team from a series season
 * @param {string} id - The ID of the season.
 * @param {string} team - The ID of the team.
 */
router.patch("/series/:id/remove/team/:team", controller.removeTeam);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete series by ID
router.delete("/series/:id", controller.deleteSeriesByID);

module.exports = router.routes();
