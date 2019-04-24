const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Crate a new user */
  async addUser(ctx) {
    let newUser = new Model.user({ 
      name: ctx.request.body.name, 
      gamertag: ctx.request.body.gamertag
    });
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

  /** Get all users */
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

  /** Get single user by ID */
  async getUserByID(ctx) {
    await Model.user
      .findOne({ _id: ctx.params.id })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "User not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get single user by Name */
  async getUserByName(ctx) {
    await Model.user
      .findOne({ name: ctx.params.name })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "User not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /** Get single user by Gamertag */
  async getUserByGamertag(ctx) {
    await Model.user
      .findOne({ gamertag: ctx.params.tag })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "User not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Updates a single user */
  async patchUserByID(ctx) {
    await Model.user
      .updateOne({ _id: ctx.params.id }, {
        name: ctx.request.body.user.name,
        gamertag: ctx.request.body.user.gamertag,
        avatar: ctx.request.body.user.avatar
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

  /** Deletes a single user */
  async deleteUserByID(ctx) {
    await Model.user
      .deleteOne({ _id: ctx.params.id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting user"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  
};
