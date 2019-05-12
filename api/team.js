const Router = require("koa-router");
const controller = require("../controllers").team;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Create a new team
 * @param {string} name - The name of the team.
 * @param {string} driver_a - The id of the user that is driver A.
 * @param {string} driver_b - The id of the user that is driver B.
 * @param {string} season - The id of the season that the team is racing in.
 */
router.post("/team", controller.addTeam);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

/** Get all teams */
router.get("/team", controller.getAllTeams);

/** Get all teams including member details */
router.get("/team/members", controller.getAllTeamsWithMembers);

/**
 * Gets a single team
 * @param {string} id - The ID of the team.
 */
router.get("/team/id/:id", controller.getTeamByID);

/**
 * Gets a single team
 * @param {string} name - The name of the team.
 */
router.get("/team/name/:name", controller.getTeamByName);

/**
 * Gets all teams that a user belongs to
 * @param {string} id - The ID of the user.
 */
router.get("/team/user/:user", controller.getTeamsByUser);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Updates a single team
 * @param {string} id - The ID of the team.
 * @param {string} name - The name of the team.
 * @param {string} driver_a - The id of the user that is driver A.
 * @param {string} driver_b - The id of the user that is driver B.
 */
router.patch("/team/:id", controller.patchTeamByID);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Deletes a single team
 * @param {string} id - The ID of the team.
 */
router.delete("/team/:id", controller.deleteTeamByID);

module.exports = router.routes();
