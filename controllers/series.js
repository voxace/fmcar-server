const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");
const fs = require("fs");
const path = require("path");

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

    if(newSeriesResult && ctx.request.body.upload) {

      const oldPath = './uploads/' + ctx.request.body.upload;
      const extension = path.extname(oldPath);
      const newPath = './public/' + newSeriesResult._id + extension;
      await fs.rename(oldPath, newPath, function(err) { if(err) { console.log('Error: ' + err) } });
      newSeriesResult.banner = newSeriesResult._id + extension;

      await newSeriesResult
        .save()
        .then(result => {
          newSeriesResult = result;
        })
        .catch(error => {
          throw new Error(error);
        });
    }
      
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
      .populate({ path: 'game',		
        populate: { path: 'tracks', model: 'Track'}
      })
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

    let model = ctx.request.body.model;

    if(model.banner != null && model.banner != 'delete') {
      const oldPath = './uploads' + model.banner;
      if (fs.existsSync(oldPath)) {
        const extension = path.extname(oldPath);
        const newPath = './public/' + ctx.params.id + extension;
        await fs.rename(oldPath, newPath, function(err) { if(err) { console.log('Error: ' + err) } });
        model.banner = ctx.params.id + extension;
      }
    }

    if(model.banner != null && model.banner == 'delete') {
      const image = './public/' + model.banner;
      await fs.unlink(image, function(err) { if(err) { console.log('Error: ' + err) } });
      model.banner = null;
    }

    if(model.logo != null && model.logo != 'delete') {
      const oldPath = './uploads' + model.logo;
      if (fs.existsSync(oldPath)) {
        const extension = path.extname(oldPath);
        const newPath = './public/' + ctx.params.id + extension;
        await fs.rename(oldPath, newPath, function(err) { if(err) { console.log('Error: ' + err) } });
        model.logo = ctx.params.id + extension;
      }
    }

    if(model.banner != null && model.logo == 'delete') {
      const image = './public/' + model.banner;
      await fs.unlink(image, function(err) { if(err) { console.log('Error: ' + err) } });
      model.logo = null;
    }

    await Model.series
      .findByIdAndUpdate(ctx.params.id, { $set: model }, { new: true })
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
