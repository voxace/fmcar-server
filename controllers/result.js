const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new result
  async addResult(ctx) {
    let model = ctx.request.body.model;
    let newResult = new Model.result(model);
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
  async getResultsBySession(ctx) {
    await Model.result
      .find({ session: ctx.params.session })
      .populate('user')
      .populate('team')
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No results found for that session"; }
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
      .findByIdAndUpdate(ctx.params.id, { $set: ctx.request.body.model }, { new: true })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error updating result"; }
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
