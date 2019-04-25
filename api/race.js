const Router = require("koa-router");
const controller = require("../controllers").race;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Create a new race
 * @param {string} series - The ID of the series that the race is held in.
 * @param {number} pointsTable - The ID of the points table used for calculation.
 * @param {number} track - The ID of the track the race is held at.
 * @param {string} round - The round of the race.
 * @param {string} number - The race number. E.g.
 * @param {string} type - The type of race. E.g. 'Endurance'
 * @param {string} configuration - The configuration of the track. E.g. 'Full circuit'
 */
router.post("/race", controller.addRace);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

/** Get all races */
router.get("/race", controller.getAllRaces);

/**
 * Gets a single race
 * @param {string} id - The ID of the race.
 */
router.get("/race/id/:id", controller.getRaceByID);

/** Get all races grouped by Series */
router.get("/race/series", controller.getRacesGroupedBySeries);

/**
 * Gets all races by series
 * @param {string} series - The ID of the series.
 */
router.get("/race/series/:series", controller.getRacesBySeries);

/**
 * Gets all races by type
 * @param {string} type - The ID of the series.
 */
router.get("/race/type/:type", controller.getRacesByType);

/**
 * Gets all races by track
 * @param {string} track - The ID of the series.
 */
router.get("/race/track/:track", controller.getRacesByTrack);



/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

// Update all race details by ID
router.patch("/race/:id", controller.patchRaceByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete race by ID
router.delete("/race/:id", controller.deleteRaceByID);

module.exports = router.routes();
