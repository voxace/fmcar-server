const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  async post(ctx) {
    let name = ctx.request.body.name;
    let year = ctx.request.body.year;
    let season = ctx.request.body.season;
    let newSeries = new Model.series({ name: name, year: year, season: season });
    await newSeries
      .save()
      .then(result => {
        ctx.body = result;
      })
  },
  async get(ctx) {
    await Model.series
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
