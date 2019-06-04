const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");
const fs = require("fs");
const path = require("path");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new track
  async addTrack(ctx) {

    let model = ctx.request.body.model;
    let newTrack = new Model.track(model);

    let newTrackResult = await newTrack
      .save()
      .catch(error => {
        throw new Error(error);
      });

    if(newTrackResult && ctx.request.body.upload) {

      const oldPath = './uploads/' + ctx.request.body.upload;
      const extension = path.extname(oldPath);
      const newPath = './public/' + newTrackResult._id + extension;
      await fs.rename(oldPath, newPath, function(err) { if(err) { console.log('Error: ' + err) } });
      newTrackResult.image = newTrackResult._id + extension;

      await newTrackResult
        .save()
        .then(result => {
          newTrackResult = result;
        })
        .catch(error => {
          throw new Error(error);
        });
    }

    ctx.body = newTrackResult;
    
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

  // Get all tracks
  async getAllTracks(ctx) {
    await Model.track
      .find({})
      .sort('name')
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No tracks found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single track by ID
  async getTrackByID(ctx) {
    await Model.track
      .findOne({ _id: ctx.params.id })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Track not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single track by Name
  async getTrackByName(ctx) {
    await Model.track
      .findOne({ name: ctx.params.name })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Track not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  // Update track name by ID
  async patchTrackByID(ctx) {

    let model = ctx.request.body.model;
    console.log(model);

    if(ctx.request.body.upload != null && ctx.request.body.upload != 'delete') {
      const oldPath = './uploads/' + ctx.request.body.upload;
      const extension = path.extname(oldPath);
      const newPath = './public/' + ctx.params.id + extension;
      await fs.rename(oldPath, newPath, function(err) { if(err) { console.log('Error: ' + err) } });
      model.image = ctx.params.id + extension;
    }

    if(ctx.request.body.upload != null && ctx.request.body.upload == 'delete') {
      const image = './public/' + model.image;
      await fs.unlink(image, function(err) { if(err) { console.log('Error: ' + err) } });
      model.image = null;
    }

    await Model.track
      .findByIdAndUpdate(ctx.params.id, { $set: ctx.request.body.model }, { new: true })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error updating track"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  // Delete track by ID
  async deleteTrackByID(ctx) {
    await Model.track
      .deleteOne({ _id: ctx.params.id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting track"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  
};
