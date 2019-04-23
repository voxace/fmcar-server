const Router = require("koa-router");
const controller = require("../controllers").team;
const router = new Router();

/* ~~~~~~~~~~~~~~~~~~~~ POSTS ~~~~~~~~~~~~~~~~~~~~ */

// Add new team (name only)
router.post("/team", controller.addTeam);

/* ~~~~~~~~~~~~~~~~~~~~ GETS ~~~~~~~~~~~~~~~~~~~~ */

// Get all teams
router.get("/team", controller.getAllTeams);

// Get all teams with member details
router.get("/team/members", controller.getAllTeamsWithMembers);

// Get single team by ID
router.get("/team/id/:id", controller.getTeamByID);

// Get single team by Name
router.get("/team/name/:name", controller.getTeamByName);

// Get all teams that member belongs to
router.get("/team/member/:member", controller.getTeamsByMember);

/* ~~~~~~~~~~~~~~~~~~~~ PATCHES ~~~~~~~~~~~~~~~~~~~~ */

// Update team name by ID
router.patch("/team/:id", controller.patchTeamByID);

// Add member to team by team ID, member ID
router.patch("/team/:id/add/:member", controller.addTeamMember);

// Remove member from team by team ID, member ID
router.patch("/team/:id/remove/:member", controller.removeTeamMember);

/* ~~~~~~~~~~~~~~~~~~~~ DELETES ~~~~~~~~~~~~~~~~~~~~ */

// Delete team by ID
router.delete("/team/:id", controller.deleteTeamByID);

module.exports = router.routes();
