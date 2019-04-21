const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  async post(ctx) {
    let name = ctx.request.body.name;
    let gamertag = ctx.request.body.gamertag;
    let newUser = new Model.user({ name: name, gamertag: gamertag});
    await newUser
      .save()
      .then(result => {
        ctx.body = result;
      })
  },
  async get(ctx) {
    ctx.body = "GET";
  },
  async put(ctx) {
    ctx.body = "PUT";
  },
  async delete(ctx) {
    ctx.body = "DELETE";
  },
  
};
