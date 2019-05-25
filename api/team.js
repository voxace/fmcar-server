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
 * Gets a single team by name
 * @param {string} name - The name of the team.
 */
router.get("/team/name/:name", controller.getTeamByName);

/**
 * Gets all teams that a user belongs to
 * @param {string} user - The ID of the user.
 */
router.get("/team/user/:user", controller.getTeamsByUser);

/**
 * Gets all teams that belong to a particular season
 * @param {string} season - The ID of the season.
 */
router.get("/team/season/:season", controller.getTeamsBySeason);

/**
 * Gets all teams that belong to a particular series
 * @param {string} series - The ID of the series.
 */
router.get("/team/series/:series", controller.getTeamsBySeries);

/**
 * Get all driver numbers for season
 * @param {string} season - The ID of the season.
 */
router.get("/team/numbers/:season", controller.getDriverNumbersBySeason);

/**
 * Gets a count of all cars used in a particular season
 * @param {string} season - The ID of the season.
 */
router.get("/team/cars/:season", controller.getCarsUsedBySeason);

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
