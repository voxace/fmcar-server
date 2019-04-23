const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new result
  async addResult(ctx) {
    let newResult = new Model.result({ 
      user: ctx.request.body.user, 
      race: ctx.request.body.race,
      pointsType: ctx.request.body.pointsType, 
      raceType: ctx.request.body.raceType,
      position: ctx.request.body.position, 
      lapTime_h: ctx.request.body.lapTime_h,
      lapTime_m: ctx.request.body.lapTime_m,
      lapTime_s: ctx.request.body.lapTime_s,
      lapTime_ms: ctx.request.body.lapTime_ms
    });
    await newResult
      .save()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error saving result"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

  // Get all results
  async getAllResults(ctx) {
    await Model.result
      .find({})
      .populate('user')
      .populate('race')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No results found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single result by ID
  async getResultByID(ctx) {
    await Model.result
      .findOne({ _id: ctx.params.id })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Result not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single result by Race
  async getResultByRace(ctx) {
    await Model.result
      .findOne({ race: ctx.params.race })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No results found for that race"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single result by User
  async getResultByUser(ctx) {
    await Model.result
      .findOne({ user: ctx.params.user })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No results found for that user"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  // Update all result details by ID
  async patchResultByID(ctx) {
    await Model.result
      .findOne({ _id: ctx.params.id })
      .then(async result => {
        if(result) {          
          if(ctx.request.body.user) { result.user = ctx.request.body.user }
          if(ctx.request.body.race) { result.race = ctx.request.body.race }
          if(ctx.request.body.pointsType) { result.pointsType = ctx.request.body.pointsType }
          if(ctx.request.body.raceType) { result.raceType = ctx.request.body.raceType }
          if(ctx.request.body.position) { result.position = ctx.request.body.position }
          if(ctx.request.body.lapTime_h) { result.lapTime_h = ctx.request.body.lapTime_h }
          if(ctx.request.body.lapTime_m) { result.lapTime_m = ctx.request.body.lapTime_m }
          if(ctx.request.body.lapTime_s) { result.lapTime_s = ctx.request.body.lapTime_s }
          if(ctx.request.body.lapTime_ms) { result.lapTime_ms = ctx.request.body.lapTime_ms }
          await result
          .save()
          .then(newResult => {
            if(newResult) { ctx.body = newResult; }
            else { throw "Error updating result"; }
          })
        } else { 
          throw "Result not found";
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  // Delete result by ID
  async deleteResultByID(ctx) {
    await Model.result
      .deleteOne({ _id: ctx.params.id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting result"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  
};
