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

// Update track by ID
router.patch("/track/:id", controller.patchTrackByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete track by ID
router.delete("/track/:id", controller.deleteTrackByID);

module.exports = router.routes();
