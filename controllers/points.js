const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new point
  async addPointsTable(ctx) {
    console.log(ctx.request.body.values);
    let newPoint = new Model.points({ 
      type: ctx.request.body.type, 
      values: ctx.request.body.values
    });
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

  // Get all points
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

  // Get single point by ID
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

  // Get single point by Name
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

  // Update points table name by ID
  async patchPointsTableNameByID(ctx) {
    await Model.points
      .updateOne({ _id: ctx.params.id }, {
        name: ctx.request.body.name
      })
      .then(result => {
        if(result.nModified > 0) { ctx.body = "Update Successful"; }
        else if(result.nModified == 0) { ctx.body = "Nothing to change"; }
        else { throw "Error updating point"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Add values to points table by ID
  async patchPointsTableValuesByID(ctx) {
    await Model.points
      .updateOne({ _id: ctx.params.id }, {
        "values.$[]": ctx.request.body.values
      })
      .then(result => {
        if(result.nModified > 0) { ctx.body = "Values successfully updated in table"; }
        else if(result.nModified == 0) { ctx.body = "Error updating table"; }
        else { throw "Error updating table"; }
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
