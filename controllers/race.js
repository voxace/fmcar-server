const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new race
  async addRace(ctx) {
    let newRace = new Model.race({ 
      number: ctx.request.body.number, 
      round: ctx.request.body.round, 
      track: ctx.request.body.track,
      configuration: ctx.request.body.configuration,
      type: ctx.request.body.type,
      series: ctx.request.body.series,
      pointsType: ctx.request.body.pointsType
    });
    await newRace
      .save()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error saving race"; }
      })
      .catch(error => {
        throw new Error(error);
      });
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
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Race not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get all races in Series
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
