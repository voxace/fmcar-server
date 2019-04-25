const Router = require("koa-router");
const controller = require("../controllers").track;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

// Add new track
router.post("/track", controller.addTrack);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

// Get all tracks
router.get("/track", controller.getAllTracks);

// Get single track by ID
router.get("/track/id/:id", controller.getTrackByID);

// Get single track by Name
router.get("/track/name/:name", controller.getTrackByName);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

// Update track name by ID
router.patch("/track/name/:id", controller.patchTrackNameByID);

// Update track logo by ID
router.patch("/track/logo/:id", controller.patchTrackLogoByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete track by ID
router.delete("/track/:id", controller.deleteTrackByID);

module.exports = router.routes();
