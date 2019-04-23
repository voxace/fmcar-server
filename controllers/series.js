const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new series
  async addSeries(ctx) {
    let name = ctx.request.body.name;
    let year = ctx.request.body.year;
    let season = ctx.request.body.season;
    let game = ctx.request.body.game;
    let newSeries = new Model.series({ 
      name: name, 
      year: year, 
      season: season,
      game: game
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
    let id = ctx.params.id;
    await Model.series
      .findOne({ _id: id })
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
    let name = ctx.params.name;
    await Model.series
      .findOne({ name: name })
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
    let year = ctx.params.year;
    await Model.series
      .find({ year: year })
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
    let game = ctx.params.game;
    await Model.series
      .find({ game: game })
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
    let id = ctx.params.id;
    await Model.series
      .findOne({ _id: id })
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
    let id = ctx.params.id;
    await Model.series
      .deleteOne({ _id: id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting series"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  
};
