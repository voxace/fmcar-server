const Router = require("koa-router");
const controller = require("../controllers").race;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

// Add new race
router.post("/race", controller.addRace);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

// Get all race
router.get("/race", controller.getAllRaces);

// Get single race by ID
router.get("/race/id/:id", controller.getRaceByID);

// Get single race by Series
router.get("/race/series/:series", controller.getRacesBySeries);

// Get all race by Type
router.get("/race/type/:type", controller.getRacesByType);

// Get all race by Track
router.get("/race/track/:track", controller.getRacesByTrack);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

// Update all race details by ID
router.patch("/race/:id", controller.patchRaceByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete race by ID
router.delete("/race/:id", controller.deleteRaceByID);

module.exports = router.routes();
