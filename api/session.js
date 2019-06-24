const Router = require("koa-router");
const controller = require("../controllers").session;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Create a new session
 * @param {object} model - The model of the session to be created
 */
router.post("/session", controller.addSession);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

/** Get all sessions */
router.get("/session", controller.getAllSessions);

/**
 * Gets a single session
 * @param {string} id - The ID of the session
 */
router.get("/session/id/:id", controller.getSessionByID);

/** Get all sessions grouped by series */
router.get("/session/series", controller.getSessionsGroupedBySeries);

/**
 * Gets all sessions by series
 * @param {string} series - The ID of the series
 */
router.get("/session/series/:series", controller.getSessionsBySeries);

/**
 * Gets all sessions by season
 * @param {string} season - The ID of the season
 */
router.get("/session/season/:season", controller.getSessionsBySeason);

/**
 * Gets all sessions by round
 * @param {string} round - The ID of the round
 */
router.get("/session/round/:round", controller.getSessionsByRound);



/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Updates a session by ID
 * @param {string} id - The ID of the session
 * @param {object} model - The model of the session to be updated
 */
router.patch("/session/:id", controller.patchSessionByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Deletes a session by ID
 * @param {string} id - The ID of the session
 */
router.delete("/session/:id", controller.deleteSessionByID);

module.exports = router.routes();
