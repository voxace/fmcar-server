const Router = require("koa-router");
const controller = require("../controllers").points;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

// Add new points table
router.post("/points", controller.addPointsTable);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

// Get all points tables
router.get("/points", controller.getAllPointsTables);

// Get single points table by ID
router.get("/points/id/:id", controller.getPointsTableByID);

// Get single points table by Type
router.get("/points/type/:type", controller.getPointsTableByType);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

// Update points table name by ID
router.patch("/points/:id", controller.patchPointsTableNameByID);

// Add values to points table by ID
router.patch("/points/:id/add", controller.patchPointsTableValuesByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete points table by ID
router.delete("/points/:id", controller.deletePointsTableByID);

module.exports = router.routes();
