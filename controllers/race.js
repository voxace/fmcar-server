const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Creates a new race and adds it to a season */
  async addRace(ctx) {
    let newRace = new Model.race({ 
      series: ctx.request.body.series,
      season: ctx.request.body.season,
      pointsTable: ctx.request.body.pointsTable,
      track: ctx.request.body.track,
      round: ctx.request.body.round, 
      number: ctx.request.body.number, 
      type: ctx.request.body.type,
      configuration: ctx.request.body.configuration,
      date: ctx.request.body.date,
    });

    let raceResult = await newRace
      .save()
      .catch(error => {
        throw new Error(error);
      });

    let seasonResult = await Model.season
      .updateOne(
        { 
          _id: ctx.request.body.season, 
        }, 
        {
          $addToSet: { races: raceResult._id }
        }
      )
      .catch(error => {
        throw new Error(error);
      });

      if(raceResult && seasonResult.nModified > 0) { 
        console.log(raceResult);
        ctx.body = raceResult;
      } else { 
        throw "Error updating season";
      }
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

  // Get all races
  async getAllRaces(ctx) {
    await Model.race
      .find({})
      .populate('series')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No races found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single race by ID
  async getRaceByID(ctx) {
    await Model.race
      .findOne({ _id: ctx.params.id })
      .populate('series')
      .populate('results')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Race not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get all races grouped by Series
  async getRacesGroupedBySeries(ctx) {
    let data = await Model.race
      .aggregate([
        {
          $lookup: {
            from: "series",
            localField: "series",
            foreignField: "_id",
            as: "series"
          }
        },        
        {
          $group: {
            _id: "$series",
            races: {
              $push: {
                _id: "$_id",
                number: "$number",
                round: "$round",
                track: "$track",
                configuration: "$configuration",
                type: "$type"
              }
            }
          }
        }
      ])
      .exec();
    ctx.body = data;    
  },

  // Get all races filtered by Series
  async getRacesBySeries(ctx) {
    await Model.race
      .find({ series: ctx.params.series })
      .populate('series')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No races found for that series"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get all races by Type
  async getRacesByType(ctx) {
    await Model.race
      .find({ type: ctx.params.type })
      .populate('series')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No race found for that type"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get all races by Track
  async getRacesByTrack(ctx) {
    await Model.race
      .find({ track: ctx.params.track })
      .populate('series')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No race found for that track"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  // Update all race details by ID
  async patchRaceByID(ctx) {
    await Model.race
      .findOne({ _id: ctx.params.id })
      .then(async result => {
        if(result) {          
          if(ctx.request.body.series) { result.series = ctx.request.body.series }
          if(ctx.request.body.pointType) { result.pointType = ctx.request.body.pointType }
          if(ctx.request.body.type) { result.type = ctx.request.body.type }
          if(ctx.request.body.configuration) { result.configuration = ctx.request.body.configuration }
          if(ctx.request.body.number) { result.number = ctx.request.body.number }
          if(ctx.request.body.round) { result.round = ctx.request.body.round }
          if(ctx.request.body.track) { result.track = ctx.request.body.track }
          await result
          .save()
          .then(newResult => {
            if(newResult) { ctx.body = newResult; }
            else { throw "Error updating race"; }
          })
        } else { 
          throw "Race not found";
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  // Delete race by ID
  async deleteRaceByID(ctx) {
    await Model.race
      .deleteOne({ _id: ctx.params.id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting race"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  
};
