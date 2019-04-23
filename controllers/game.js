const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new game
  async addGame(ctx) {
    let name = ctx.request.body.name;
    let gamertag = ctx.request.body.gamertag;
    let newGame = new Model.game({ name: name, gamertag: gamertag});
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
    let id = ctx.params.id;
    await Model.game
      .findOne({ _id: id })
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
    let name = ctx.params.name;
    await Model.game
      .findOne({ name: name })
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
    let id = ctx.params.id;
    let name = ctx.request.body.name;
    await Model.game
      .updateOne({ _id: id }, {
        name: name
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
    let id = ctx.params.id;
    let logo = ctx.request.body.logo;
    await Model.game
      .updateOne({ _id: id }, {
        logo: logo
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
    let id = ctx.params.id;
    await Model.game
      .deleteOne({ _id: id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting game"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  
};
