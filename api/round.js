const Router = require("koa-router");
const controller = require("../controllers").round;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Create a new round
 * @param {object} model - The model of the round to be created
 */
router.post("/round", controller.addRound);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

/** Get all rounds */
router.get("/round", controller.getAllRounds);

/**
 * Gets a single round
 * @param {string} id - The ID of the round
 */
router.get("/round/id/:id", controller.getRoundByID);

/** Get all rounds grouped by series */
router.get("/round/series", controller.getRoundsGroupedBySeries);

/**
 * Gets all rounds by series
 * @param {string} series - The ID of the series
 */
router.get("/round/series/:series", controller.getRoundsBySeries);

/**
 * Gets all rounds by season
 * @param {string} season - The ID of the season
 */
router.get("/round/season/:season", controller.getRoundsBySeason);

/**
 * Gets all rounds by type
 * @param {string} type - The ID of the series
 */
router.get("/round/type/:type", controller.getRoundsByType);

/**
 * Gets all rounds by track
 * @param {string} track - The ID of the series
 */
router.get("/round/track/:track", controller.getRoundsByTrack);



/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Updates a round by ID
 * @param {string} id - The ID of the round
 * @param {object} model - The model of the round to be updated
 */
router.patch("/round/:id", controller.patchRoundByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Deletes a round by ID
 * @param {string} id - The ID of the round
 */
router.delete("/round/:id", controller.deleteRoundByID);

module.exports = router.routes();
