const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Create a new season */
  async addSeason(ctx) {
    let newSeason = new Model.season({ 
      series: ctx.request.body.series,
      season: ctx.request.body.season,
    });

    let seasonResult = await newSeason
      .save()
      .catch(error => {
        throw new Error(error);
      });

    let seriesResult = await Model.series
      .updateOne(
        { 
          _id: ctx.request.body.series, 
        }, 
        {
          $addToSet: { seasons: seasonResult._id }
        }
      )
      .catch(error => {
        throw new Error(error);
      });

      if(seasonResult && seriesResult.nModified > 0) { 
        console.log(seasonResult);
        ctx.body = seasonResult;
      } else { 
        throw "Error updating season";
      }
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

 /** Get all seasons */
  async getAllSeasons(ctx) {
    await Model.season
      .find({})
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No seasons found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

   /** Get all seasons including all details */
   async getAllSeasonsWithDetails(ctx) {
    await Model.season
      .find({})
      .populate({ path: 'races',			
        populate: { path: 'races', model: 'Race' }
      })
      .populate({ path: 'teams',			
        populate: { path: 'users', model: 'User' }
      })
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No seasons found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get single season by ID */
  async getSeasonByID(ctx) {
    await Model.season
      .findOne({ _id: ctx.params.id })
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Season not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Gets a single season including all details */
  async getSeasonWithDetailsByID(ctx) {
    await Model.season
      .findOne({ _id: ctx.params.id })
      .populate({ path: 'races',			
        populate: { path: 'races', model: 'Race' }
      })
      .populate({ path: 'teams',			
        populate: { path: 'users', model: 'User' }
      })
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No season found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all seasons by series */
  async getAllSeasonsBySeries(ctx) {
    await Model.season
      .find({ series: ctx.params.series })
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Season not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all seasons by series including all details */
  async getAllSeasonsWithDetailsBySeries(ctx) {
    await Model.season
      .find({ series: ctx.params.series })
      .populate({ path: 'races',			
        populate: { path: 'races', model: 'Race' }
      })
      .populate({ path: 'teams',			
        populate: { path: 'users', model: 'User' }
      })
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Season not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Gets a single season by series and season */
  async getSeasonBySeriesAndSeason(ctx) {
    await Model.season
      .findOne({ 
        series: ctx.params.series,
        season: ctx.params.season,
      })
      .populate({ path: 'races',			
        populate: { path: 'races', model: 'Race' }
      })
      .populate({ path: 'teams',			
        populate: { path: 'users', model: 'User' }
      })
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Season not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Update all season details by ID */
  async patchSeasonByID(ctx) {
    await Model.season
      .findOne({ _id: ctx.params.id })
      .then(async result => {
        if(result) {          
          if(ctx.request.body.name) { result.name = ctx.request.body.name }
          if(ctx.request.body.banner) { result.banner = ctx.request.body.banner }
          if(ctx.request.body.logo) { result.logo = ctx.request.body.logo }
          if(ctx.request.body.year) { result.year = ctx.request.body.year }
          if(ctx.request.body.game) { result.game = ctx.request.body.game }
          await result
          .save()
          .then(newResult => {
            if(newResult) { ctx.body = newResult; }
            else { throw "Error updating season"; }
          })
        } else { 
          throw "Season not found";
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Add team by to season by ID */
  async addTeam(ctx) {    
    let seasonResult = await Model.season
      .updateOne({ _id: ctx.params.id }, {
        $addToSet: { teams: ctx.params.team }
      })
      .catch(error => {
        throw new Error(error);
      });

    let teamResult = await Model.team
      .updateOne({ _id: ctx.params.team }, {
        $addToSet: { season: ctx.params.id }
      })
      .catch(error => {
        throw new Error(error);
      });

      if(seasonResult.nModified > 0 && teamResult.nModified > 0) { 
        ctx.body = "Team successfully added to season";
      } else if(seasonResult.nModified == 0) { 
        ctx.body = "Team ID already in season team list";
      } else if(teamResult.nModified == 0) { 
        ctx.body = "Season ID already in team's season list";
      } else { 
        throw "Error updating season"; 
      }
  },

  /** Remove team by from season by ID */
  async removeTeam(ctx) {    
    let seasonResult = await Model.season
      .updateOne({ _id: ctx.params.id }, {
        $pull: { teams: ctx.params.team }
      })
      .catch(error => {
        throw new Error(error);
      });

    let teamResult = await Model.team
      .updateOne({ _id: ctx.params.team }, {
        $pull: { season: ctx.params.id }
      })
      .catch(error => {
        throw new Error(error);
      });

      if(seasonResult.nModified > 0 && teamResult.nModified > 0) { 
        ctx.body = "Team successfully removed from season";
      } else if(seasonResult.nModified == 0) { 
        ctx.body = "Team ID not in season team list";
      } else if(teamResult.nModified == 0) { 
        ctx.body = "Season ID not in team's season list";
      } else { 
        throw "Error updating season"; 
      }
  },

  /** Add race by to season by ID */
  async addRace(ctx) {    
    let seasonResult = await Model.season
      .updateOne({ _id: ctx.params.id }, {
        $addToSet: { races: ctx.params.race }
      })
      .catch(error => {
        throw new Error(error);
      });

      if(seasonResult.nModified > 0) { 
        ctx.body = "Race successfully added to season";
      } else if(seasonResult.nModified == 0) { 
        ctx.body = "Race ID already in season race list";
      } else { 
        throw "Error updating season"; 
      }
  },

  /** Remove race by from season by ID */
  async removeRace(ctx) {    
    let seasonResult = await Model.season
      .updateOne({ _id: ctx.params.id }, {
        $pull: { races: ctx.params.race }
      })
      .catch(error => {
        throw new Error(error);
      });

      // TODO: remove all results

      // TODO: remove all races

      if(seasonResult.nModified > 0) { 
        ctx.body = "Race successfully removed from season";
      } else if(seasonResult.nModified == 0) { 
        ctx.body = "Race ID not in season race list";
      } else { 
        throw "Error updating season"; 
      }
  },

  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  /** Delete season by ID */
  async deleteSeasonByID(ctx) {
    await Model.season
      .deleteOne({ _id: ctx.params.id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting season"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  
};
