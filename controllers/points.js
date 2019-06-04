const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new points table
  async addPointsTable(ctx) {
    
    let model = ctx.request.body.model;
    let newPoint = new Model.points(model);

    await newPoint
      .save()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error saving points table"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

  // Get all points tables
  async getAllPointsTables(ctx) {
    await Model.points
      .find({})
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No points tables found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single points table by ID
  async getPointsTableByID(ctx) {
    await Model.points
      .findOne({ _id: ctx.params.id })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Points table not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single points table by type
  async getPointsTableByType(ctx) {
    await Model.points
      .findOne({ type: ctx.params.type })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Point not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  // Update points table by ID
  async patchPointsTableByID(ctx) {
    await Model.points
      .findByIdAndUpdate(ctx.params.id, { $set: ctx.request.body.model }, { new: true })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error updating points table"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  // Delete points table by ID
  async deletePointsTableByID(ctx) {
    let id = ctx.params.id;
    await Model.points
      .deleteOne({ _id: id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting point"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  
};
