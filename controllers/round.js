const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Creates a new round and adds it to a season */
  async addRound(ctx) {

    let model = ctx.request.body.model;
    let newRound = new Model.round(model);
    console.log(model);

    let roundResult = await newRound
      .save()
      .catch(error => {
        throw new Error(error);
      });

    let seasonResult = await Model.season
      .updateOne(
        { 
          _id: model.season, 
        }, 
        {
          $addToSet: { rounds: roundResult._id }
        }
      )
      .catch(error => {
        throw new Error(error);
      });

      if(roundResult && seasonResult.nModified > 0) { 
        console.log(roundResult);
        ctx.body = roundResult;
      } else { 
        throw "Error updating season";
      }
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

  // Get all rounds
  async getAllRounds(ctx) {
    await Model.round
      .find({})
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No rounds found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single round by ID
  async getRoundByID(ctx) {
    await Model.round
      .findOne({ _id: ctx.params.id })
      .populate('results')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Round not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get all rounds grouped by Series
  async getRoundsGroupedBySeries(ctx) {
    let data = await Model.round
      .aggregate([
        {
          $lookup: {
            from: "series",
            localField: "series",
            foreignField: "_id",
            as: "series"
          }
        },        
        {
          $group: {
            _id: "$series",
            rounds: {
              $push: {
                _id: "$_id",
                number: "$number",
                round: "$round",
                track: "$track",
                configuration: "$configuration",
                type: "$type"
              }
            }
          }
        }
      ])
      .exec();
    ctx.body = data;    
  },

  // Get all rounds filtered by series
  async getRoundsBySeries(ctx) {
    await Model.round
      .find({ series: ctx.params.series })
      .populate('series')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No rounds found for that series"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get all rounds filtered by season
  async getRoundsBySeason(ctx) {
    await Model.round
      .find({ season: ctx.params.season })
      .populate('series')
      .populate('season')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No rounds found for that season"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get all rounds by Type
  async getRoundsByType(ctx) {
    await Model.round
      .find({ type: ctx.params.type })
      .populate('series')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No round found for that type"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get all rounds by Track
  async getRoundsByTrack(ctx) {
    await Model.round
      .find({ track: ctx.params.track })
      .populate('series')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No round found for that track"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  // Update all round details by ID
  async patchRoundByID(ctx) {
    await Model.round
      .findByIdAndUpdate(ctx.params.id, { $set: ctx.request.body.model }, { new: true })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error updating round"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  // Delete round by ID
  async deleteRoundByID(ctx) {

    // Get round details
    let roundResult = await Model.round
      .findOne({ _id: ctx.params.id })
      .catch(error => {
        throw new Error(error);
      });

    // Remove the round from the season
    await Model.season
      .updateOne({ _id: roundResult.season }, {
        $pull: { rounds: ctx.params.round }
      })
      .catch(error => {
        throw new Error(error);
      });

    // Remove all of the results for the round
    await Model.result
      .deleteMany({ round: ctx.params.round })
      .catch(error => {
        throw new Error(error);
      });

    // Remove the round itself
    await Model.round
      .deleteOne({ _id: ctx.params.id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting round"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  
  },
  
};
