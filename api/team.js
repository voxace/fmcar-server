const Router = require("koa-router");
const controller = require("../controllers").team;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Adds a new team
 * @param {string} name - The name of the team.
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
 * Gets all teams that a member belongs to
 * @param {string} id - The ID of the member.
 */
router.get("/team/member/:member", controller.getTeamsByMember);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Updates a single team
 * @param {string} id - The ID of the team.
 * @param {string} name - The name of the team.
 */
router.patch("/team/:id", controller.patchTeamByID);

/**
 * Adds a member to a team
 * @param {string} id - The ID of the team.
 * @param {string} member - The ID of the member.
 */
router.patch("/team/:id/add/:member", controller.addTeamMember);

/**
 * Removes a member from a team
 * @param {string} id - The ID of the team.
 * @param {string} member - The ID of the member.
 */
router.patch("/team/:id/remove/:member", controller.removeTeamMember);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

/**
 * Deletes a single team
 * @param {string} id - The ID of the team.
 */
router.delete("/team/:id", controller.deleteTeamByID);

module.exports = router.routes();
