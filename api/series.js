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
 * Gets a single series
 * @param {string} id - The ID of the series.
 */
router.get("/series/id/:id", controller.getSeriesByID);

/**
 * Gets a single series including team details
 * @param {string} id - The ID of the series.
 */
router.get("/series/teams/:id", controller.getSeriesWithTeamsByID);

/**
 * Gets all series by Name
 * @param {string} name - The name of the series.
 */
router.get("/series/name/:name", controller.getAllSeriesByName);

/**
 * Gets all series by name including team details
 * @param {string} name - The name of the series.
 */
router.get("/series/teams/name/:name", controller.getAllSeriesWithTeamsByName);

/**
 * Gets all series by year
 * @param {number} year - The year of the series.
 */
router.get("/series/year/:year", controller.getSeriesByYear);

/**
 * Gets all series by game
 * @param {string} game - The ID of the game.
 */
router.get("/series/game/:game", controller.getSeriesByGame);

/**
 * Gets a single series by name, year and season
 * @param {string} name - The name of the series.
 * @param {number} year - The year of the series.
 * @param {number} season - The season of the series.
 */
router.get("/series/:name/:year/:season", controller.getSeriesByNameYearSeason);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Adds all series details by ID
 * @param {string} id - The ID of the series.
 * @param {string} name [optional] - The name of the series.
 * @param {string} game [optional] - The id of the game.
 * @param {number} season [optional] - The season of the series.
 * @param {number} year [optional] - The year of the series.
 * @param {string} banner [optional] - The banner (image) of the series.
 * @param {string} logo [optional] - The logo (image) of the series.
 */
router.patch("/series/:id", controller.patchSeriesByID);

/**
 * Adds a team to a series
 * @param {string} id - The ID of the series.
 * @param {string} team - The ID of the team.
 */
router.patch("/series/:id/add/:team", controller.addTeam);

/**
 * Removes a team from a series
 * @param {string} id - The ID of the series.
 * @param {string} team - The ID of the team.
 */
router.patch("/series/:id/add/:team", controller.removeTeam);

/**
 * Adds a race to a series
 * @param {string} id - The ID of the series.
 * @param {string} race - The ID of the race.
 */
router.patch("/series/:id/add/:team", controller.addRace);

/**
 * Removes a race from a series
 * @param {string} id - The ID of the series.
 * @param {string} race - The ID of the race.
 */
router.patch("/series/:id/add/:team", controller.removeRace);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete series by ID
router.delete("/series/:id", controller.deleteSeriesByID);

module.exports = router.routes();
