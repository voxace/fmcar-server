const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  async post(ctx) {
    let name = ctx.request.body.name;
    let newGame = new Model.game({ name: name });
    await newGame
      .save()
      .then(result => {
        ctx.body = result;
      })
  },
  async get(ctx) {
    await Model.game
      .find({})
      .then(result => {
        ctx.body = result;
      })
  },
  async put(ctx) {
    ctx.body = "PUT";
  },
  async delete(ctx) {
    ctx.body = "DELETE";
  },

};
