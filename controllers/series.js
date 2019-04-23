const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new series
  async addSeries(ctx) {
    let newSeries = new Model.series({ 
      name: ctx.request.body.name, 
      year: ctx.request.body.year, 
      season: ctx.request.body.season,
      game: ctx.request.body.game
    });
    await newSeries
      .save()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error saving series"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

  // Get all seriess
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

  // Get single series by ID
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

  // Get single series by Name
  async getSeriesByName(ctx) {
    await Model.series
      .findOne({ name: ctx.params.name })
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

  // Get all series by Year
  async getSeriesByYear(ctx) {
    await Model.series
      .find({ year: ctx.params.year })
      .populate('game')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No series found for that year"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get all series by Game
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

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  // Update all series details by ID
  async patchSeriesByID(ctx) {
    await Model.series
      .findOne({ _id: ctx.params.id })
      .then(async result => {
        if(result) {          
          if(ctx.request.body.name) { result.name = ctx.request.body.name }
          if(ctx.request.body.banner) { result.banner = ctx.request.body.banner }
          if(ctx.request.body.logo) { result.logo = ctx.request.body.logo }
          if(ctx.request.body.year) { result.year = ctx.request.body.year }
          if(ctx.request.body.season) { result.season = ctx.request.body.season }
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

  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  // Delete series by ID
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
