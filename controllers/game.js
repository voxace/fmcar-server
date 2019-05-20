const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new game
  async addGame(ctx) {

    let newGame = new Model.game({ 
      name: ctx.request.body.name,
    });

    let newGameResult = await newGame
      .save()
      .catch(error => {
        throw new Error(error);
      });

    if(newGameResult && ctx.request.body.logo) {

      // TODO: rename image to match object ID

      newGameResult.logo = ctx.request.body.logo;
      await newGameResult
        .save()
        .then(result => {
          ctx.body = result;
        })
        .catch(error => {
          throw new Error(error);
        });
    } else {
      ctx.body = newGameResult;
    }
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

    // TODO: rename image to match object ID before updating
    console.log(ctx.request.body.logo);

    await Model.game
      .updateOne({ _id: ctx.params.id }, {
        name: ctx.request.body.name,
        logo: ctx.request.body.logo
      })
      .then(result => {
        if(result.nModified > 0) { ctx.body = "Name update Successful"; }
        else if(result.nModified == 0) { ctx.body = "Nothing to change"; }
        else { throw "Error updating game name"; }
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
