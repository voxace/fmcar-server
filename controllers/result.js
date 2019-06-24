const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new result
  async addResult(ctx) {

    let model = ctx.request.body.model;
    let newResult = new Model.result(model);
    console.log(model);

    let resultResult = await newResult
      .save()
      .catch(error => {
        throw new Error(error);
      });

    let sessionResult = await Model.session
      .updateOne(
        { 
          _id: model.session, 
        }, 
        {
          $addToSet: { results: resultResult._id }
        }
      )
      .catch(error => {
        throw new Error(error);
      });

      if(resultResult && sessionResult.nModified > 0) { 
        ctx.body = resultResult;
      } else { 
        throw "Error updating session";
      }
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

  // Get all results by session
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

  // Get all results by season
  async getResultsBySeason(ctx) {
    // CALCULATE RESULTS FOR WHOLE SEASON

    // get all results for season
    let sessionResults = await Model.result
      .find({ session: ctx.params.session })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No results found for that session"; }
      })
      .catch(error => {
        throw new Error(error);
      });

    // add points from sessions to the round total
    // group by each user
    // sort by points
    // drop lowest round if needed
    // add points together for a total column
    // sort by total column
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
