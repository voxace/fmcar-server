const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Create a new series */
  async addSeries(ctx) {

    let newSeason = new Model.season({ 
      season: 1
    });

    let newSeasonResult = await newSeason
      .save()
      .catch(error => {
        throw new Error(error);
      });

    let newSeries = new Model.series({ 
      name: ctx.request.body.name, 
      year: ctx.request.body.year, 
      game: ctx.request.body.game,
      seasons: [ newSeasonResult._id ]
    });

    let newSeriesResult = await newSeries
      .save()
      .catch(error => {
        throw new Error(error);
      });
      
    await Model.season
      .updateOne({ _id: newSeasonResult._id }, {
        series: newSeriesResult._id
      })
      .then((result) => {
        if(result) { ctx.body = newSeriesResult; }
        else { throw "Error adding series"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

 /** Get all series */
  async getAllSeries(ctx) {
    await Model.series
      .find({})
      .populate('game')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No series found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

   /** Get all series including team details */
   async getAllSeriesWithTeams(ctx) {
    await Model.series
      .find({})
      .populate('game')
      .populate({ path: 'teams',			
        populate: { path: 'users', model: 'User' }
      })
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No series found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get single series by ID */
  async getSeriesByID(ctx) {
    await Model.series
      .findOne({ _id: ctx.params.id })
      .populate('game')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Series not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Gets a single series including team details */
  async getSeriesWithTeamsByID(ctx) {
    await Model.series
      .findOne({ _id: ctx.params.id })
      .populate('game')
      .populate({ path: 'teams',			
        populate: { path: 'users', model: 'User' }
      })
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No series found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all series by Name */
  async getAllSeriesByName(ctx) {
    await Model.series
      .find({ name: ctx.params.name })
      .populate('game')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Series not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all series by Name */
  async getAllSeriesWithTeamsByName(ctx) {
    await Model.series
      .find({ name: ctx.params.name })
      .populate('game')
        .populate({ path: 'teams',			
          populate: { path: 'users', model: 'User' }
        })
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Series not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all series by Year */
  async getSeriesByYear(ctx) {
    await Model.series
      .find({ year: ctx.params.year })
      .populate('game')
      .populate('seasons')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No series found for that year"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get all series by Game */
  async getSeriesByGame(ctx) {
    await Model.series
      .find({ game: ctx.params.game })
      .populate('game')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No series found for that game"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Gets a single series by name, year and season */
  async getSeriesByNameAndYear(ctx) {
    await Model.series
      .findOne({ 
        name: ctx.params.name,
        year: ctx.params.year,
      })
      .populate('game')
      .populate('seasons')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Series not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Update all series details by ID */
  async patchSeriesByID(ctx) {
    await Model.series
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
            else { throw "Error updating series"; }
          })
        } else { 
          throw "Series not found";
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Add team by to series by ID */
  async addTeam(ctx) {    
    let seriesResult = await Model.series
      .updateOne({ _id: ctx.params.id }, {
        $addToSet: { teams: ctx.params.team }
      })
      .catch(error => {
        throw new Error(error);
      });

    let teamResult = await Model.team
      .updateOne({ _id: ctx.params.team }, {
        $addToSet: { series: ctx.params.id }
      })
      .catch(error => {
        throw new Error(error);
      });

      if(seriesResult.nModified > 0 && teamResult.nModified > 0) { 
        ctx.body = "Team successfully added to series";
      } else if(seriesResult.nModified == 0) { 
        ctx.body = "Team ID already in series team list";
      } else if(teamResult.nModified == 0) { 
        ctx.body = "Series ID already in team's series list";
      } else { 
        throw "Error updating series"; 
      }
  },

  /** Remove team by from series by ID */
  async removeTeam(ctx) {    
    let seriesResult = await Model.series
      .updateOne({ _id: ctx.params.id }, {
        $pull: { teams: ctx.params.team }
      })
      .catch(error => {
        throw new Error(error);
      });

    let teamResult = await Model.team
      .updateOne({ _id: ctx.params.team }, {
        $pull: { series: ctx.params.id }
      })
      .catch(error => {
        throw new Error(error);
      });

      if(seriesResult.nModified > 0 && teamResult.nModified > 0) { 
        ctx.body = "Team successfully removed from series";
      } else if(seriesResult.nModified == 0) { 
        ctx.body = "Team ID not in series team list";
      } else if(teamResult.nModified == 0) { 
        ctx.body = "Series ID not in team's series list";
      } else { 
        throw "Error updating series"; 
      }
  },

  /** Add race by to series by ID */
  async addRace(ctx) {    
    let seriesResult = await Model.series
      .updateOne({ _id: ctx.params.id }, {
        $addToSet: { races: ctx.params.race }
      })
      .catch(error => {
        throw new Error(error);
      });

      if(seriesResult.nModified > 0) { 
        ctx.body = "Race successfully added to series";
      } else if(seriesResult.nModified == 0) { 
        ctx.body = "Race ID already in series race list";
      } else { 
        throw "Error updating series"; 
      }
  },

  /** Remove race by from series by ID */
  async removeRace(ctx) {    
    let seriesResult = await Model.series
      .updateOne({ _id: ctx.params.id }, {
        $pull: { races: ctx.params.race }
      })
      .catch(error => {
        throw new Error(error);
      });

      // TODO: remove all results

      // TODO: remove all races

      if(seriesResult.nModified > 0) { 
        ctx.body = "Race successfully removed from series";
      } else if(seriesResult.nModified == 0) { 
        ctx.body = "Race ID not in series race list";
      } else { 
        throw "Error updating series"; 
      }
  },

  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  /** Delete series by ID */
  async deleteSeriesByID(ctx) {
    await Model.series
      .deleteOne({ _id: ctx.params.id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting series"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  
};
