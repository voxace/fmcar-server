const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new game
  async addGame(ctx) {
    let newGame = new Model.game({ 
      name: ctx.request.body.name, 
      gamertag: ctx.request.body.gamertag
    });
    await newGame
      .save()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error saving game"; }
      })
      .catch(error => {
        throw new Error(error);
      });
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

  // Update game name by ID
  async patchGameNameByID(ctx) {
    await Model.game
      .updateOne({ _id: ctx.params.id }, {
        name: ctx.request.body.name
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

  // Update game logo by ID
  async patchGameLogoByID(ctx) {
    await Model.game
      .updateOne({ _id: ctx.params.id }, {
        logo: ctx.request.body.logo
      })
      .then(result => {
        if(result.nModified > 0) { ctx.body = "Logo update Successful"; }
        else if(result.nModified == 0) { ctx.body = "Nothing to change"; }
        else { throw "Error updating game logo"; }
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
