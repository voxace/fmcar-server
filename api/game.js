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

// Update game name by ID
router.patch("/game/:id", controller.patchGameNameByID);

// Update game logo by ID
router.patch("/game/:id", controller.patchGameLogoByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete game by ID
router.delete("/game/:id", controller.deleteGameByID);

module.exports = router.routes();
