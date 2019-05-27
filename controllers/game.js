const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");
const fs = require("fs");
const path = require("path");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new game
  async addGame(ctx) {

    let model = ctx.request.body.model;
    let newGame = new Model.game(model);

    let newGameResult = await newGame
      .save()
      .catch(error => {
        throw new Error(error);
      });

    if(newGameResult && ctx.request.body.upload) {

      const oldPath = './uploads/' + ctx.request.body.upload;
      const extension = path.extname(oldPath);
      const newPath = './public/' + newGameResult._id + extension;
      await fs.rename(oldPath, newPath, function(err) { if(err) { console.log('Error: ' + err) } });
      newGameResult.logo = newGameResult._id + extension;

      await newGameResult
        .save()
        .then(result => {
          newGameResult = result;
        })
        .catch(error => {
          throw new Error(error);
        });
    }

    ctx.body = newGameResult;
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

  // Get all games
  async getAllGames(ctx) {
    await Model.game
      .find({})
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No games found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single game by ID
  async getGameByID(ctx) {
    await Model.game
      .findOne({ _id: ctx.params.id })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Game not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single game by Name
  async getGameByName(ctx) {
    await Model.game
      .findOne({ name: ctx.params.name })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Game not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  // Update game by ID
  async patchGameByID(ctx) {

    let model = ctx.request.body.model;

    if(ctx.request.body.upload != null && ctx.request.body.upload != 'delete') {
      const oldPath = './uploads/' + ctx.request.body.upload;
      const extension = path.extname(oldPath);
      const newPath = './public/' + ctx.params.id + extension;
      await fs.rename(oldPath, newPath, function(err) { if(err) { console.log('Error: ' + err) } });
      model.logo = ctx.params.id + extension;
    }

    if(ctx.request.body.upload != null && ctx.request.body.upload == 'delete') {
      const image = './public/' + model.logo;
      await fs.unlink(image, function(err) { if(err) { console.log('Error: ' + err) } });
      model.logo = null;
    }

    await Model.game
      .findByIdAndUpdate(ctx.params.id, { $set: ctx.request.body.model }, { new: true })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error updating game"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  // Delete game by ID
  async deleteGameByID(ctx) {
    await Model.game
      .deleteOne({ _id: ctx.params.id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting game"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  
};
