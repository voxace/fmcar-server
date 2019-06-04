const Router = require("koa-router");
const controller = require("../controllers").race;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Create a new race
 * @param {object} model - The model of the race to be created
 */
router.post("/race", controller.addRace);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

/** Get all races */
router.get("/race", controller.getAllRaces);

/**
 * Gets a single race
 * @param {string} id - The ID of the race
 */
router.get("/race/id/:id", controller.getRaceByID);

/** Get all races grouped by series */
router.get("/race/series", controller.getRacesGroupedBySeries);

/**
 * Gets all races by series
 * @param {string} series - The ID of the series
 */
router.get("/race/series/:series", controller.getRacesBySeries);

/**
 * Gets all races by season
 * @param {string} season - The ID of the season
 */
router.get("/race/season/:season", controller.getRacesBySeason);

/**
 * Gets all races by type
 * @param {string} type - The ID of the series
 */
router.get("/race/type/:type", controller.getRacesByType);

/**
 * Gets all races by track
 * @param {string} track - The ID of the series
 */
router.get("/race/track/:track", controller.getRacesByTrack);



/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Updates a race by ID
 * @param {string} id - The ID of the race
 * @param {object} model - The model of the race to be updated
 */
router.patch("/race/:id", controller.patchRaceByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Deletes a race by ID
 * @param {string} id - The ID of the race
 */
router.delete("/race/:id", controller.deleteRaceByID);

module.exports = router.routes();
