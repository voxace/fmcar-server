const Router = require("koa-router");
const controller = require("../controllers").points;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Create a new points table
 * @param {object} model - The model of the points table to be created
 */
router.post("/points", controller.addPointsTable);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

/** Get all points tables */
router.get("/points", controller.getAllPointsTables);

/**
 * Gets a single points table by ID
 * @param {string} id - The ID of the points table
 */
router.get("/points/id/:id", controller.getPointsTableByID);

/**
 * Gets a single points table by type
 * @param {string} type - The type of points table
 */
router.get("/points/type/:type", controller.getPointsTableByType);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Updates a points table by ID
 * @param {string} id - The ID of the points table
 * @param {object} model - The model of the points table to be updated
 */
router.patch("/points/:id", controller.patchPointsTableByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Deletes a single race by ID
 * @param {string} id - The ID of the points table
 */
router.delete("/points/:id", controller.deletePointsTableByID);

module.exports = router.routes();
