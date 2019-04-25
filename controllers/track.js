const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new track
  async addTrack(ctx) {
    let newTrack = new Model.track({ 
      name: ctx.request.body.name
    });
    await newTrack
      .save()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error saving track"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

  // Get all tracks
  async getAllTracks(ctx) {
    await Model.track
      .find({})
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
  async patchTrackNameByID(ctx) {
    await Model.track
      .updateOne({ _id: ctx.params.id }, {
        name: ctx.request.body.name
      })
      .then(result => {
        if(result.nModified > 0) { ctx.body = "Name update Successful"; }
        else if(result.nModified == 0) { ctx.body = "Nothing to change"; }
        else { throw "Error updating track name"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Update track logo by ID
  async patchTrackLogoByID(ctx) {
    await Model.track
      .updateOne({ _id: ctx.params.id }, {
        logo: ctx.request.body.logo
      })
      .then(result => {
        if(result.nModified > 0) { ctx.body = "Logo update Successful"; }
        else if(result.nModified == 0) { ctx.body = "Nothing to change"; }
        else { throw "Error updating track logo"; }
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
