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

  /** Copies a season */
  async copySeason(ctx) {

    // Create a new season
    let newSeason = new Model.season({ 
      series: ctx.request.body.series,
      season: ctx.request.body.season,
      races: []
    });

    // Save the season
    let seasonResult = await newSeason
      .save()
      .catch(error => {
        throw new Error(error);
      });

    // Find all races from old season
    const cursor = await Model.race.find({ season: ctx.request.body.oldSeason }).cursor();

    // Loop through each of the old races
    await cursor.eachAsync(async doc => {

      // Dupilcate the race details
      let newRace = new Model.race({ 
        series: doc.series,
        season: seasonResult._id,
        pointsTable: doc.pointsTable,
        track: doc.track,
        round: doc.round, 
        number: doc.number, 
        type: doc.type,
        configuration: doc.configuration,
        date: doc.date,
      });
  
      // Save duplicate races for the new season
      let raceResult = await newRace
        .save()
        .catch(error => {
          throw new Error(error);
        });
        
      // Add them to the season
      await Model.season
      .updateOne(
        { 
          _id: seasonResult._id, 
        }, 
        {
          $addToSet: { races: raceResult._id }
        }
      )
      .catch(error => {
        throw new Error(error);
      });
      
    });

    // Update the series to include the season
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

    // Check to see if it all worked
    if(seasonResult && seriesResult.nModified > 0) { 
      console.log(seasonResult);
      ctx.body = seasonResult;
    } else { 
      throw "Error duplicating season";
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
      .populate({ path: 'rounds',		
        populate: { path: 'track', model: 'Track'}
      })
      .populate({ path: 'rounds',		
        populate: { path: 'sessions', model: 'Session', 
          populate: { path: 'pointsTable', model: 'Points' } 
        }
      })
      .populate({ path: 'teams',			
        populate: { path: 'driver_a driver_b', model: 'User' }
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
      .populate({ path: 'rounds',		
        populate: { path: 'track', model: 'Track'}
      })
      .populate({ path: 'teams',			
        populate: { path: 'driver_a driver_b', model: 'User' }
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
      .populate({ path: 'rounds',		
        populate: { path: 'track', model: 'Track'}
      })
      .populate({ path: 'teams',			
        populate: { path: 'driver_a driver_b', model: 'User' }
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
      .populate({ path: 'rounds',		
        populate: { path: 'track', model: 'Track'}
      })
      .populate({ path: 'teams',			
        populate: { path: 'driver_a driver_b', model: 'User' }
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
      .findByIdAndUpdate(ctx.params.id, { $set: ctx.request.body.model }, { new: true })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error updating session"; }
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
        $addToSet: { seasons: ctx.params.id }
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

  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  /** Delete season by ID */
  async deleteSeasonByID(ctx) {
    
    // Delete all results
    await Model.result
      .deleteMany({ season: ctx.params.id })
      .catch(error => {
        throw new Error(error);
      });

    // Delete all races
    await Model.race
      .deleteMany({ season: ctx.params.id })
      .catch(error => {
        throw new Error(error);
      });

    // Remove from teams
    await Model.team
      .updateOne({ seasons: ctx.params.id }, {
        $pull: { seasons: ctx.params.id }
      })
      .catch(error => {
        throw new Error(error);
      });

    // Update the number on remaining seasons
    const current = await Model.season.findOne({ _id: ctx.params.id });
    const cursor = await Model.season
      .find({ season: { $gt: current.season }, series: current.series })
      .cursor();
    await cursor.eachAsync(async doc => {
      doc.season -= 1;
      await doc
        .save()
        .catch(error => {
          throw new Error(error);
        });
    });

    // Delete season itself
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
