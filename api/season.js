const Router = require("koa-router");
const controller = require("../controllers").season;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Create a new season
 * @param {number} season - The number of the season.
 * @param {string} series - The ID of the series it belongs to.
 */
router.post("/season", controller.addSeason);

/**
 * Copies a season
 * @param {number} season - The number of the season.
 * @param {number} oldSeason - The ID of the season to copy.
 * @param {string} series - The ID of the series it belongs to.
 */
router.post("/season/copy", controller.copySeason);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

/** Get all seasons */
router.get("/season", controller.getAllSeasons);

/** Get all seasons including all details */
router.get("/season/populate", controller.getAllSeasonsWithDetails);

/**
 * Get a single season
 * @param {string} id - The ID of the season.
 */
router.get("/season/id/:id", controller.getSeasonByID);

/**
 * Get a single season including all details
 * @param {string} id - The ID of the season.
 */
router.get("/season/id/:id/populate", controller.getSeasonWithDetailsByID);

/**
 * Get all seasons by series
 * @param {string} name - The ID of the series.
 */
router.get("/season/series/:series", controller.getAllSeasonsBySeries);

/**
 * Get all season by series including all details
 * @param {string} series - The ID of the series.
 */
router.get("/season/series/:series/populate", controller.getAllSeasonsWithDetailsBySeries);

/**
 * Get a single season by series and season number
 * @param {string} series - The ID of the series it belongs to.
 * @param {number} season - The number of the season.
 */
router.get("/season/series/:series/season/:season", controller.getSeasonBySeriesAndSeason);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Add a team to a season
 * @param {string} id - The ID of the season.
 * @param {string} team - The ID of the team.
 */
router.patch("/season/:id/add/team/:team", controller.addTeam);

/**
 * Remove a team from a season
 * @param {string} id - The ID of the season.
 * @param {string} team - The ID of the team.
 */
router.patch("/season/:id/remove/team/:team", controller.removeTeam);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete season by ID
router.delete("/season/:id", controller.deleteSeasonByID);

module.exports = router.routes();
