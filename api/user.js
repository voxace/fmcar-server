const Router = require("koa-router");
const controller = require("../controllers").user;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

// Add new user
router.post("/user", controller.addUser);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

// Get all users
router.get("/user", controller.getAllUsers);

// Get single user by ID
router.get("/user/id/:id", controller.getUserByID);

// Get single user by Name
router.get("/user/name/:name", controller.getUserByName);

// Get single user by Gamertag
router.get("/user/gamertag/:tag", controller.getUserByGamertag);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

// Update user by ID
router.patch("/user/:id", controller.patchUserByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete user by ID
router.delete("/user/:id", controller.deleteUserByID);

module.exports = router.routes();
