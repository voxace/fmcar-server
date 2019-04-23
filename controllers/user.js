const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  // Add new user
  async addUser(ctx) {
    let name = ctx.request.body.name;
    let gamertag = ctx.request.body.gamertag;
    let newUser = new Model.user({ name: name, gamertag: gamertag});
    await newUser
      .save()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error saving user"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

  // Get all users
  async getAllUsers(ctx) {
    await Model.user
      .find({})
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No users found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single user by ID
  async getUserByID(ctx) {
    let id = ctx.params.id;
    await Model.user
      .findOne({ _id: id })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "User not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single user by Name
  async getUserByName(ctx) {
    let name = ctx.params.name;
    await Model.user
      .findOne({ name: name })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "User not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single user by Gamertag
  async getUserByGamertag(ctx) {
    let tag = ctx.params.tag;
    await Model.user
      .findOne({ gamertag: tag })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "User not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  // Update user by ID
  async patchUserByID(ctx) {
    let id = ctx.params.id;
    let user = ctx.request.body.user;
    await Model.user
      .updateOne({ _id: id }, {
        name: user.name,
        gamertag: user.gamertag,
        avatar: user.avatar
      })
      .then(result => {
        if(result.nModified > 0) { ctx.body = "Update Successful"; }
        else if(result.nModified == 0) { ctx.body = "Nothing to change"; }
        else { throw "Error updating user"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  // Delete user by ID
  async deleteUserByID(ctx) {
    let id = ctx.params.id;
    await Model.user
      .deleteOne({ _id: id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting user"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  
};
