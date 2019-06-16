const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Create a new team */
  async addTeam(ctx) {
    
    let model = ctx.request.body.model;
    console.log(model);
    let newTeam = new Model.team(model);

    let teamResult = await newTeam
      .save()
      .catch(error => {
        throw new Error(error);
      });

    if(model.season) {
      await Model.season
        .updateOne(
          { 
            _id: model.season, 
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
      .find({ $or: [ { driver_a: ctx.params.user }, { driver_b: ctx.params.user } ] })
      .populate('driver_a')
      .populate('driver_b')
      .exec()
      .then(result => {
        if(result.length > 0) { ctx.body = result; }
        else if(result.length == 0) { ctx.body = []; }
        else { throw "Error getting teams by user"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all teams that user belongs to */
  async getTeamByUserAndSeason(ctx) {
    await Model.team
      .findOne({ 
        season: ctx.params.season,
        $or: [ { driver_a: ctx.params.user }, { driver_b: ctx.params.user } ] 
      })
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else if(!result) { ctx.body = "Team not found"; }
        else { throw "Error getting teams by user"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all teams that are in a particular season */
  async getTeamsBySeason(ctx) {
    await Model.team
      .find({ season: ctx.params.season })
      .populate('driver_a')
      .populate('driver_b')
      .exec()
      .then(result => {
        if(result.length > 0) { ctx.body = result; }
        else if(result.length == 0) { ctx.body = []; }
        else { throw "Error getting teams by user"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all teams that are in a particular series */
  async getTeamsBySeries(ctx) {
    await Model.team
      .find({ series: ctx.params.series })
      .populate('driver_a')
      .populate('driver_b')
      .exec()
      .then(result => {
        if(result.length > 0) { ctx.body = result; }
        else if(result.length == 0) { ctx.body = []; }
        else { throw "Error getting teams by user"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all driver numbers for season */
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
    if (data.length > 0) {
      ctx.body = data[0].numbers.sort(compareNumbers);
    } else {
      ctx.body = [];
    }    
  },

  /** Get all drivers for season */
  async getDriversBySeason(ctx) {    
    let data = await Model.team
      .aggregate([
        {
          $match: 
          {
            season: mongoose.Types.ObjectId(ctx.params.season)
          }
        },
        { 
          $lookup: {
            from: 'users',
            let: { "userId": "$driver_a" },
            pipeline: [
              { "$match": { "$expr": { "$eq": [ "$_id", "$$userId" ] }}},
              { "$project": { "name": 1 }}
            ],
            as: 'driver_a'
          } 
        },
        {
          $unwind: "$driver_a"
        },
        { 
          $lookup: {
            from: 'users',
            let: { "userId": "$driver_b" },
            pipeline: [
              { "$match": { "$expr": { "$eq": [ "$_id", "$$userId" ] }}},
              { "$project": { "name": 1 }}
            ],
            as: 'driver_b'
          } 
        },
        {
          $unwind: "$driver_b"
        },
        {
          $group: {
            _id: "$season",
            driver_a: { $addToSet: "$driver_a" },
            driver_b: { $addToSet: "$driver_b" }
          }
        },
        { 
          $project: {
            _id: false,
            drivers: { 
              $concatArrays: [ "$driver_a", "$driver_b" ] 
            }
          } 
        }
      ])
      .exec();
    ctx.body = data[0].drivers;
  },

  /** Get all cars used for season */
  async getCarsUsedBySeason(ctx) {    
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
            _id: "$car",
            count:{ $sum:1 }
          }
        }
      ])
      .exec();
    if (data.length == 1 && data[0]._id == null) {
      ctx.body = [];
    } else {
      ctx.body = data;
    }
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Update team by ID */
  async patchTeamByID(ctx) {
    await Model.team
      .findByIdAndUpdate(ctx.params.id, { $set: ctx.request.body.model }, { new: true })
      .then(result => {
        if(result) { ctx.body = result; }
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