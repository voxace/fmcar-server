const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Create a new series */
  async addSeries(ctx) {

    let model = ctx.request.body.model;
    
    let newSeason = new Model.season({ 
      season: 1
    });

    let newSeasonResult = await newSeason
      .save()
      .catch(error => {
        throw new Error(error);
      });

    model.seasons = [ newSeasonResult._id ];

    let newSeries = new Model.series(model);

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

  /** Get single series by ID */
  async getSeriesByID(ctx) {
    await Model.series
      .findOne({ _id: ctx.params.id })
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

  /** Get all series by Name */
  async getAllSeriesByName(ctx) {
    await Model.series
      .find({ name: ctx.params.name })
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

  /** Get all series by Year */
  async getAllSeriesByYear(ctx) {
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
  async getAllSeriesByGame(ctx) {
    await Model.series
      .find({ game: ctx.params.game })
      .populate('game')
      .populate('seasons')
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
      .findByIdAndUpdate(ctx.params.id, { $set: ctx.request.body.model }, { new: true })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error updating series"; }
      })
      .catch(error => {
        throw new Error(error);
      });
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
