const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Create a new team */
  async addTeam(ctx) {
    let newTeam = new Model.team({ 
      name: ctx.request.body.name 
    });
    await newTeam
      .save()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error saving team"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

  /** Get all teams */
  async getAllTeams(ctx) {
    await Model.team
      .find({})
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No teams found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all teams including member details */
  async getAllTeamsWithMembers(ctx) {
    await Model.team
      .find({})
      .populate('users')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No teams found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get single team by ID */
  async getTeamByID(ctx) {
    await Model.team
      .findOne({ _id: ctx.params.id })
      .populate('users')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Team not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get single team by Name */
  async getTeamByName(ctx) {
    await Model.team
      .findOne({ name: ctx.params.name })
      .populate('users')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Team not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all teams that member belongs to */
  async getTeamsByMember(ctx) {
    await Model.team
      .find({ users: { $in: new mongoose.Types.ObjectId(ctx.params.member) } })
      .populate('users')
      .exec()
      .then(result => {
        if(result.length > 0) { ctx.body = result; }
        else if(result.length == 0) { ctx.body = "Member not found in any teams"; }
        else { throw "Error getting teams by member"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Update team name by ID */
  async patchTeamByID(ctx) {
    await Model.team
      .updateOne({ _id: ctx.params.id }, {
        name: ctx.request.body.name
      })
      .then(result => {
        if(result.nModified > 0) { ctx.body = "Update successful"; }
        else if(result.nModified == 0) { ctx.body = "Nothing to change"; }
        else { throw "Error updating team"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Add member to team by team ID, member ID */
  async addTeamMember(ctx) {    
    let teamResult = await Model.team
      .updateOne({ _id: ctx.params.id }, {
        $addToSet: { users: ctx.params.member }
      })
      .catch(error => {
        throw new Error(error);
      });

    let userResult = await Model.user
      .updateOne({ _id: ctx.params.member }, {
        $addToSet: { teams: ctx.params.id }
      })
      .catch(error => {
        throw new Error(error);
      });

      if(teamResult.nModified > 0 && userResult.nModified > 0) { 
        ctx.body = "Member successfully added to team";
      } else if(teamResult.nModified == 0) { 
        ctx.body = "Member ID already in team's list";
      } else if(userResult.nModified == 0) { 
        ctx.body = "Team ID already in member's list";
      } else { 
        throw "Error updating team"; 
      }
  },

  /** Remove member from team by team ID, member ID */
  async removeTeamMember(ctx) {
    let teamResult = await Model.team
      .updateOne({ _id: ctx.params.id }, {
        $pull: { users: ctx.params.member }
      })
      .catch(error => {
        throw new Error(error);
      });

    let userResult = await Model.user
      .updateOne({ _id: ctx.params.member }, {
        $pull: { teams: ctx.params.id }
      })
      .catch(error => {
        throw new Error(error);
      });

      if(teamResult.nModified > 0 && userResult.nModified > 0) { 
        ctx.body = "Member successfully removed from team";
      } else if(teamResult.nModified == 0) { 
        ctx.body = "Member ID not in team's list";
      } else if(userResult.nModified == 0) { 
        ctx.body = "Team ID not in member's list";
      } else { 
        throw "Error updating team"; 
      }
  },


  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  /** Delete team by ID */
  async deleteTeamByID(ctx) {
    await Model.team
      .deleteOne({ _id: ctx.params.id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting team"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  
};