const Router = require("koa-router");
const controller = require("../controllers").game;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

// Add new game
router.post("/game", controller.addGame);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

// Get all games
router.get("/game", controller.getAllGames);

// Get single game by ID
router.get("/game/id/:id", controller.getGameByID);

// Get single game by Name
router.get("/game/name/:name", controller.getGameByName);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

// Update game by ID
router.patch("/game/:id", controller.patchGameByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete game by ID
router.delete("/game/:id", controller.deleteGameByID);

module.exports = router.routes();
