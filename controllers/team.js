const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Create a new team */
  async addTeam(ctx) {
    
    let newTeam = new Model.team({ 
      name: ctx.request.body.name,
      driver_a: ctx.request.body.driver_a,
      driver_b: ctx.request.body.driver_b,
      driver_a_num: ctx.request.body.driver_a_num,
      driver_b_num: ctx.request.body.driver_b_num,
    });

    if(ctx.request.body.season) {
      newTeam.season = ctx.request.body.season;
    }

    let teamResult = await newTeam
      .save()
      .catch(error => {
        throw new Error(error);
      });

    if(ctx.request.body.season) {
      await Model.season
        .updateOne(
          { 
            _id: ctx.request.body.season, 
          }, 
          {
            $addToSet: { teams: teamResult._id }
          }
        )
        .catch(error => {
          throw new Error(error);
        });
    }

    if(teamResult) {
      ctx.body = teamResult;
    }
    
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
      .populate('driver_a')
      .populate('driver_b')
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
      .populate('driver_a')
      .populate('driver_b')
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
      .populate('driver_a')
      .populate('driver_b')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Team not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all teams that user belongs to */
  async getTeamsByUser(ctx) {
    await Model.team
      .find({ $or: [ { driver_a: ctx.params.user, driver_b: ctx.params.user } ] })
      .populate('driver_a')
      .populate('driver_b')
      .exec()
      .then(result => {
        if(result.length > 0) { ctx.body = result; }
        else if(result.length == 0) { ctx.body = "User not found in any teams"; }
        else { throw "Error getting teams by user"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all teams that user belongs to */
  async getTeamsBySeason(ctx) {
    await Model.team
      .find({ season: ctx.params.season })
      .populate('driver_a')
      .populate('driver_b')
      .exec()
      .then(result => {
        if(result.length > 0) { ctx.body = result; }
        else if(result.length == 0) { ctx.body = "No teams found in season"; }
        else { throw "Error getting teams by user"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all teams that user belongs to */
  async getDriverNumbersBySeason(ctx) {    
    let data = await Model.team
      .aggregate([
        {
          $match: 
          {
            season: mongoose.Types.ObjectId(ctx.params.season)
          }
        },
        {
          $group: {
            _id: "$season",
            driver_a: { $addToSet: "$driver_a_num" },
            driver_b: { $addToSet: "$driver_b_num" }
          }
        },
        { 
          $project: { 
            numbers: { 
              $concatArrays: [ "$driver_a", "$driver_b" ] 
            } 
          } 
        }
      ])
      .exec();

    function compareNumbers(a, b) { return a - b; }
    ctx.body = data[0].numbers.sort(compareNumbers);
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Update team name and drivers by ID */
  async patchTeamByID(ctx) {
    await Model.team
      .updateOne({ _id: ctx.params.id }, {
        name: ctx.request.body.name,
        driver_a: ctx.request.body.driver_a,
        driver_b: ctx.request.body.driver_b,
        driver_a_num: ctx.request.body.driver_a_num,
        driver_b_num: ctx.request.body.driver_b_num
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