const Router = require("koa-router");
const controller = require("../controllers").user;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Adds a new user
 * @param {string} name - The name of the user.
 * @param {string} gamertag - The gamertag of the user.
 */
router.post("/user", controller.addUser);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

/** Get all users */
router.get("/user", controller.getAllUsers);

/**
 * Gets a single user
 * @param {string} id - The ID of the user.
 */
router.get("/user/id/:id", controller.getUserByID);

/**
 * Gets a single user
 * @param {string} name - The name of the user.
 */
router.get("/user/name/:name", controller.getUserByName);

/**
 * Gets a single user
 * @param {string} gamertag - The gamertag of the user.
 */
router.get("/user/gamertag/:tag", controller.getUserByGamertag);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Updates a single user
 * @param {string} id - The ID of the user.
 * @param {string} name - The name of the user.
 * @param {string} gamertag - The gamertag of the user.
 * @param {string} avatar - The avatar (image) of the user.
 */
router.patch("/user/:id", controller.patchUserByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Deletes a single user
 * @param {string} id - The ID of the user.
 */
router.delete("/user/:id", controller.deleteUserByID);

module.exports = router.routes();
